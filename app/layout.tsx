import { PT_Sans_Caption } from 'next/font/google'
import NavBar from './components/navbar/NavBar'
import './globals.css'

const font = PT_Sans_Caption({ subsets: ['latin'], weight: '700' })

export const metadata = {
  title: 'Task Manager App',
  description: 'Manage your tasks for free!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font.className bg-zinc-800`}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
