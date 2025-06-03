export async function POST(req: Request) {
  let { images } = await req.json();
  if (!images || !Array.isArray(images)) {
    return new Response("Invalid input", { status: 400 });
  }
}
