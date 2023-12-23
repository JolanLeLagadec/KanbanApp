import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { ClerkProvider } from '@clerk/nextjs'
import Provider from '@/util/Provider'
import { Toaster } from 'sonner'

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
            <Provider>
              {children}
            </Provider>
            <Toaster />
          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  )
}
