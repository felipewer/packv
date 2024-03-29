import { getInstance } from "@/lib/packer"

const VERSION = 1

export async function POST(request: Request) {
  try {
    const packer = getInstance(VERSION)

    const contentType = request.headers.get('Content-Type') || 'text/plain'
    const contentTypeId = packer.mapContentTypeToId(contentType)

    const input = await request.text()
    const encoded = packer.encode(input)

    const location = `${request.url}${VERSION}/${encoded}?t=${contentTypeId}`
    return new Response(null,{
      status: 201,
      headers: { 'Location': location }
    })

  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 });
  }
}
