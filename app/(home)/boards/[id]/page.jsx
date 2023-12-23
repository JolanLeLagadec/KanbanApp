import { getBoard, getBoards } from "@/request/boards"


export default async function Board({ params }) {

  const { id } = params
  const boards = await getBoards()
  console.log(boards, 'ici')

  return (
    <div>
        
    </div>
  )
}
