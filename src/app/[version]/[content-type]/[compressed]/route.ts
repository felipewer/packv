import { NextRequest } from 'next/server';
import { getInstance } from '@/lib/packer';


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
    const [,version, contentTypeId, encoded] = req.nextUrl.pathname.split('/')
    
    const packer = getInstance(parseInt(version))
    const contentType = packer.mapIdToContentType(contentTypeId)
    const decoded = packer.decode(encoded)
    
    return new Response(decoded, { headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS'
    }});
  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 });
  }

}