import {  base64EncArr } from '../lib/base64-util'


const base64EncoderStream = () => new TransformStream<Uint8Array,string>({
  transform(chunk, controller) {
    controller.enqueue(base64EncArr(chunk))
  }
})


const uriEncoderStream = () => new TransformStream<string,string>({
  transform(chunk, controller) {
    controller.enqueue(encodeURIComponent(chunk))
  }
})


export const onRequestPost: PagesFunction<{}> = async (context) => {
  try {

    const transformedStream = context.request.body
      // .pipeThrough(new CompressionStream("gzip"))
      .pipeThrough(base64EncoderStream())
      .pipeThrough(uriEncoderStream())
      .pipeThrough(new TextEncoderStream())


    // let transformed = ''
    // for await (const chunk of transformedStream) {
    //   transformed = `${transformed}${chunk}`
    // }

    return new Response(
      transformedStream, 
      { headers: {'Content-Type':'text/plain'} }
    )

  } catch (err) {
    console.error(err)
    return new Response(err.message, { status: 500 });
  }
}