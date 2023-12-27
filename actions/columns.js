'use server'
import db from "@/lib/db/db"

export const getColumns = async (id) => {

        const columns = await db.columns.findMany({
            where: {boardId: id}
        })
        return columns
    
 
}
export const addColumn = async (id, name) => {

        const boardId = parseInt(id)
        const columns = await db.columns.create({
            data: {
                boardId,
                name
            }
        })
        console.log(columns)
        return columns
        
    
}