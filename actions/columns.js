'use server'
import db from "@/lib/db/db"

export const getColumns = async (id) => {

   
    const columns = await db.columns.findMany({
        where: {boardId: id}
    })
    return columns
}