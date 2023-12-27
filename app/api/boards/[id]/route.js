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
        id: boardId ,
      },
    });
    return Response.json(board);
  } catch (e) {
    return Response.json({ error: e.message });
  }
}


export async function DELETE(req, {params}){

  const { id } = params
  const boardId = parseInt(id)

  try {
   const board =  await db.board.delete({
      where: {
        id: boardId
      }
    })

    return Response.json({status: 200})
  }catch(e){
    console.error('Error deleting board:', e.message)
    return Response.json({error: e.message})
  }
}