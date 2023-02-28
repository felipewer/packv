import * as LZString from 'lz-string'
import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return new Response(null,{
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS'
    }
  })
}

export async function GET(req: NextRequest) {
  try {
    const encoded = req.nextUrl.pathname.slice(1)
    const decoded = LZString.decompressFromEncodedURIComponent(encoded)
  
    return new Response(decoded, { headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS'
    }});
  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 });
  }

}

export const runtime = 'experimental-edge'