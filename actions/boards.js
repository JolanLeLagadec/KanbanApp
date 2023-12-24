'use server'
import db from '@/lib/db/db'
export const getBoards = async () => {
    const boards = await db.board.findMany({
        include: {
            column: {
                include: {
                    task: {include: {subtask: true} }
                }
            }

        }
    })
    return boards
}


export const getBoard = async (id) => {
    const boardId = parseInt(id)
    const board = await db.board.findUnique({
        where: {id: boardId},
        include: {
            column: {
                include: {
                    task: {include: {subtask: true} }
                }
            }

        }
    })
return board
}