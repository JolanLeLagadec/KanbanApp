import db from "@/lib/db/db";

export async function DELETE(req, { params }) {
  const { id } = params;
  const taskId = parseInt(id);

  try {
    const res = await db.task.delete({
      where: {
        id: taskId,
      },
    });
   
    return Response.json({ status: 200 });
  } catch (e) {
    return Response.json({ error: e.message });
  }
}
export async function GET(req, { params }) {
  const { id } = params;
  const taskId = parseInt(id);
  try {
    const task = await db.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        subtask: true,
      },
    });
    return Response.json(task);
  } catch (e) {
    return Response.json({ error: e.message });
  }
}
export async function PUT(req, { params }) {
  const { id } = params;
  const taskId = parseInt(id);

  const { columnId, isDone } = await req.json();

  try {
    const taskUpdated = await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        columnId,
        subtask: {
          updateMany: Object.entries(isDone).map(([subTaskId, done]) => ({
            where: { id: parseInt(subTaskId) },
            data: {
              done: done,
            },
          })),
        },
      },
    });
   
    return Response.json(taskUpdated);
  } catch (e) {
    return Response.json({ error: e.message });
  }
}
