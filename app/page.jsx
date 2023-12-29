
import { getBoards } from "@/actions/boards"
import { Button } from "@/components/ui/button"


import Link from "next/link"

export default async function Home() {

  return (
    
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blueGrayish">
      <header className="px-4 lg:px-6 h-14 flex items-center">
          <div className="flex gap-2 items-center justify-center h-fit">
              <div className="flex justify-center items-center gap-1">
                <div className="w-2 h-7 rounded-md bg-mainPurple"></div>
                <div className="w-2 h-7 rounded-md bg-secondPurple"></div>
                <div className="w-2 h-7 rounded-md bg-blueGrayish"></div>
              </div>
              <div>
                <h1 className="font-bold text-3xl">Kanban</h1>
              </div>
          </div>
          <span className="sr-only">Kanban App</span>
        <nav className="hidden md:flex ml-auto gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          <div>
    </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 h-full">
          <div className="container px-4 md:px-6 h-[13rem]">
            <div className=" space-y-4 text-center h-full">
              <div className="space-y-8 flex flex-col items-center h-full">
                <h1 className=" font-bold tracking-tighter text-5xl lg:text-6xl/none">
                  Manage your projects efficiently
                </h1>
                <p className="mx-auto w-[30rem] text-gray-500 text-2xl dark:text-gray-400 ">
                  Organize your tasks, collaborate with your team, and get things done with our Kanban app.
                </p>
              </div>   
              
              <Link href='/boards'><Button size='lg' className="bg-mainPurple hover:opacity-70 hover:bg-secondPurple text-lg mt-8">Get started</Button></Link>
            </div>
          </div>
        </section>
       
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© Kanban App. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
    
  )
}


