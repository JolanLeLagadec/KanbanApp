import db from "@/lib/db/db";
import { currentUser } from "@clerk/nextjs";

export async function GET(req, { params }) {
  const { id } = params;
  if (!id) {
    return Response.json("The request failed", { status: 400 });
  }
  const boardId = parseInt(id);
  const user = await currentUser()

  try {
    const board = await db.board.findUnique({
      where: {
          id: boardId,
          userId: user.id
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
  console.log(boardId)
  const user = await currentUser()

  try {
   const board =  await db.board.delete({
      where: {
          id: boardId,
          userId: user.id
      }
    })

    return Response.json({status: 200})
  }catch(e){
    console.error('Error deleting board:', e.message)
    return Response.json({error: e.message})
  }
}