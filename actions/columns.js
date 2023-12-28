'use server'
import db from "@/lib/db/db"

export const getColumns = async (id) => {

        const columns = await db.columns.findMany({
            where: {boardId: id}
        })
        return columns
    
}
export const addColumn = async (id, name, color) => {
        const boardId = parseInt(id)
        const columns = await db.columns.create({
            data: {
                boardId,
                name,
                color
            }
        })

        return columns
        
    
}
export const updateColumn = async (id, name, color) => {
        const boardId = parseInt(id)
        const columns = await db.columns.create({
            data: {
                boardId,
                name,
                color
            }
        })

        return columns
        
    
}