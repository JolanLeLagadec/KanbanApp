import db from "@/lib/db/db";
import { currentUser } from "@clerk/nextjs";

export async function POST(req) {
  const data = await req.json();
  const { name, columns } = data;

  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Vous devez vous connecter pour créer un board");
    }
    if (!name || name === "") {
      throw new Error("Vous devez spécifier un nom de board");
    }

    const newBoard = await db.board.create({
      data: {
        userId: user.id,
        name,
        column: {
          createMany: {
            data: columns.map((column) => ({ name: column })),
          },
        },
      },
    });

    return Response.json(newBoard);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}

export async function GET() {

try {
  const boards = await db.board.findMany({
    include: {
      column: {
        include: {
          task: {
            include: { subtask: true },
          },
        },
      },
    },
  });
  return Response.json(boards);
}catch(error){
  return Response.json({error: error.message})
}
}



    

 




