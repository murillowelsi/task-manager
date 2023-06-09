import { PT_Sans_Caption } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import NewTaskModal from './components/modals/NewTaskModal'
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
      <body className={`${font.className} bg-zinc-900`}>
        <ClientOnly>
          <ToasterProvider />
          <NewTaskModal />
          <LoginModal />
          <RegisterModal />
          <NavBar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
