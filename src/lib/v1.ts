import * as LZString from 'lz-string'
import { Packer } from "@/lib/packer"


const supportedContentTypes = [
  'text/plain',
  'text/csv',
  'text/html',
  'application/json'
]


const V1: Packer = {

  encode: (input: string) => {
    return LZString.compressToEncodedURIComponent(input)
  },


  decode: (input: string) => {
    return LZString.decompressFromEncodedURIComponent(input)
  },


  mapContentTypeToId: (contentType: string) => {
    const id = supportedContentTypes.indexOf(contentType)
    if (id === -1) {
      throw new Error('Content Type not supported')
    }

    return `${id}`
  },


  mapIdToContentType: (id: string) => {
    const contentType = supportedContentTypes[parseInt(id)]
    if (!contentType) {
      throw new Error('Content Type not supported')
    }

    return contentType
  }
}


export default V1