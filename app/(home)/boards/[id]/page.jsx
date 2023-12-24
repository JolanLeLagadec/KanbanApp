import { getBoard } from "@/actions/boards"
import {
  dehydrate,
  QueryClient,
  HydrationBoundary
} from "@tanstack/react-query"
import Board from "./Board"


export default async function PageBoard({ params }) {
  const { id } = params
 
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['board', id],
    queryFn: () => getBoard(id)
  })


  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Board boardId={id} />
      </HydrationBoundary>
    </div>
  )
}
