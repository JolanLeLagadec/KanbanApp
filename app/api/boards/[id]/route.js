import db from "@/lib/db/db";

export async function GET(req, { params }) {
  const { id } = params;
  if (!id) {
    return Response.json("The request failed", { status: 400 });
  }
  const boardId = parseInt(id);
  try {
    const board = await db.board.findUnique({
      where: {
        id: { boardId },
      },
    });
  
    return Response.json(board);
  } catch (e) {
    return Response.json({ error: e.message });
  }
}
