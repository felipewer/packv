import V1 from "@/lib/v1";

export interface Packer {
  encode: (input: string) => string;
  decode: (input: string) => string;
  mapContentTypeToId: (contentType: string) => string;
  mapIdToContentType: (id: string) => string;
}


const versions = [
  V1
]


export const getInstance = (version: number) => {
 const instance = versions[version - 1]
 if (!instance) {
  throw new Error('Unsupported version')
 }

 return instance
}