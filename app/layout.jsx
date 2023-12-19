import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { ClerkProvider } from '@clerk/nextjs'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/navbar/Navbar'
import Layout from '@/components/layout/Layout'

const inter = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Kanban',

}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <body className={inter.className}>
            <Layout>
              {children}
            </Layout>

          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  )
}
