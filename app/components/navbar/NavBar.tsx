'use client'

import { SafeUser } from '@/app/types'
import Container from '../Container'
import Logo from './Logo'
import UserMenu from './UserMenu'

interface NavBarProps {
  currentUser?: SafeUser | null
}

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  return (
    <div className="fixed z-10 w-full bg-zinc-950 shadow-sm">
      <div className="border-b-[1px] border-zinc-500 py-4 text-white">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default NavBar
