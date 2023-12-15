import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { ClerkProvider } from '@clerk/nextjs'

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
            <main>
              {children}
            </main>
          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  )
}
