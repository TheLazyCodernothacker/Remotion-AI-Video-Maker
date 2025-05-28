import { reset } from "../../utils/FileSystem";

export function GET() {
  reset();
  return new Response("File system reset successfully", { status: 200 });
}
