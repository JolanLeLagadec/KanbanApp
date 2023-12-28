 export const getBoards = async () => {
   
    const response = await fetch('/api/boards', {
        headers: {
            'Content-type': 'application/json'
        }
    })
    const boards = await response.json()
    return boards
}

export const getBoard = async (id) => {
   
    const response = await fetch(`/api/boards/${id}`, {
        headers: {
            'Content-type': 'application/json'
        }
    })
    const board = await response.json()  

    return board  
}
