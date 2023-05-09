import { PT_Sans_Caption } from 'next/font/google'
import { getCurrentUser } from './actions/getCurrentUser'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import NavBar from './components/navbar/NavBar'
import './globals.css'
import ToasterProvider from './providers/ToasterProvider'

const font = PT_Sans_Caption({ subsets: ['latin'], weight: '700' })

export const metadata = {
  title: 'Task Manager App',
  description: 'Manage your tasks for free!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={`font.className bg-zinc-800`}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <NavBar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
