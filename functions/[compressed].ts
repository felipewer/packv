import * as LZString from 'lz-string'

export const onRequestGet: PagesFunction<{}> = async (context) => {
  try {
    const encoded = context.functionPath.slice(1)
    const decoded = LZString.decompressFromEncodedURIComponent(encoded)
  
    return new Response(decoded, { headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }});
  } catch (err) {
    console.error(err)
    return new Response(err.message, { status: 500 });
  }

}