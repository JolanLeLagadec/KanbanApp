import db from "@/lib/db/db";

export async function POST(req){


    const { searchParams } = new URL(req.url)
    const  id  = searchParams.get("id")
    const taskId = parseInt(id)
    const name = await req.json()
    
    if(!name){
        return Response.json('Name is empty', {status: 400})
    }
 
    try {
         await db.subtask.create({
            data: {
                taskId,
                name
            }
        })
        
        return Response.json({status: 200})
    }catch(e){
        console.error(e)
    }

}