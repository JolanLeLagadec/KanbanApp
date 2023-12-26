import db from "@/lib/db/db";

export async function DELETE(req, { params}) {
  const { id } = params;
  const taskId = parseInt(id);
  console.log('on est là', taskId)
  try {
    const res = await db.task.delete({
      where: {
        id: taskId,
      },
    });
    console.log(res)
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
  const {columnId, subtasks } = await req.json()
console.log("on y est")
  try {
    const newTask = await db.task.update({
      where: {
        id: taskId,
      },
    data: {
      columnId,
      subtask: {
        updateMany: {
          where: {
            id: {in: subtasks}
          },
          data: {
            done: true
          }
        }
      }
    }
    }); 
    console.log('ici new task', newTask)
    return Response.json(newTask);
  } catch (e) {
    return Response.json({ error: e.message });
  }
}
