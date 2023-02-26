import * as LZString from 'lz-string'

export const onRequestPost: PagesFunction<{}> = async (context) => {
  try {

    const input = await context.request.text()
    const encoded = LZString.compressToEncodedURIComponent(input)

    return new Response(
      encoded, 
      { headers: {'Content-Type':'text/plain'} }
    )

  } catch (err) {
    console.error(err)
    return new Response(err.message, { status: 500 });
  }
}