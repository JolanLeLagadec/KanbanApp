'use server'
import db from '@/lib/db/db'
import { currentUser } from '@clerk/nextjs'
export const getBoards = async () => {
    const user = await currentUser()
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
    const user = await currentUser()
    const board = await db.board.findUnique({
        where: {
                id: boardId,
                userId: user.id   
        },   
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