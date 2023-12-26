import db from "@/lib/db/db";

export async function POST(req) {

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("columnId");
  const columnId = parseInt(id)

  const data = await req.json();
  const { title, description, subTasks } = data;
  
  if(!title){
    return Response.json('Title is missing')
  }

  try {
    const newTask = await db.task.create({
      data: {
        columnId,
        name: title,
        description,
        subtask: {
          createMany: {
            data: subTasks.map((subtask) => ({ name: subtask })),
          },
        },
      },
    });
    return Response.json(newTask);
  } catch (e) {
    return Response.json({ error: e.message });
  }
}
