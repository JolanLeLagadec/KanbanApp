import db from "@/lib/db/db";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("columnId");
  const columnId = parseInt(id)

  const data = await req.json();
  const { title, description, subTasks } = data;
  
  if (!title) {
    return Response.json('Title is missing');
  }

  try {
    let taskData = {
      columnId,
      name: title,
      description,
    };

    if (subTasks && Array.isArray(subTasks)) {
      taskData.subtask = {
        createMany: {
          data: subTasks.map((subtask) => ({ name: subtask })),
        },
      };
    }

    const newTask = await db.task.create({
      data: taskData,
    });

    return Response.json(newTask);
  } catch (e) {
    return Response.json({ error: e.message });
  }
}
