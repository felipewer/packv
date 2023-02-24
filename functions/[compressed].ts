import { base64DecToArr } from '../lib/base64-util'


const toReadableStream = (input: string) => new ReadableStream<string>({
  start(controller) {
    controller.enqueue(input)
    controller.close()
  }
});


const uriDecoderStream = () => new TransformStream<string,string>({
  transform(chunk, controller) {
    controller.enqueue(decodeURIComponent(chunk))
  }
})


const base64DecoderStream = () => new TransformStream<string,Uint8Array>({
  transform(chunk, controller) {
    controller.enqueue(base64DecToArr(chunk))
  }
})


export const onRequestGet: PagesFunction<{}> = async (context) => {
  try {
    const encoded = context.functionPath.slice(1)
  
    const decompressedReadableStream = toReadableStream(encoded)
        .pipeThrough(uriDecoderStream())
        .pipeThrough(base64DecoderStream())
        // .pipeThrough(new DecompressionStream('gzip'))
  
  
    return new Response(decompressedReadableStream, { headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }});
  } catch (err) {
    console.error(err)
    return new Response(err.message, { status: 500 });
  }

}