'use server'

import db from "@/lib/db/db"

export const updateTask = async (updatedTask) => {

    const newTask = await db.task.update({
        where: {id: updatedTask.id},
        data: {
            columnId: updatedTask.columnId
        }
    })
    return newTask
}