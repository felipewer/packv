/**
 * POST /api/submit
 */
export async function onRequestGet(context) {
  const compressed = context.functionPath
  return new Response(compressed)
}