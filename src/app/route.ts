import { redirect } from 'next/navigation'
import * as LZString from 'lz-string'


export async function GET() {
  redirect('/home')
}


export async function POST(request: Request) {
  try {

    const input = await request.text()
    const encoded = LZString.compressToEncodedURIComponent(input)

    return new Response(
      encoded, 
      { headers: {'Content-Type':'text/plain'} }
    )

  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 });
  }
}

export const runtime = 'experimental-edge'