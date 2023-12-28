export const getTask = async (id) => {
   
    const response = await fetch(`/api/tasks/${id}`, {
        headers: {
            'Content-type': 'application/json'
        }
    })
    const task = await response.json()  
    return task  
}
