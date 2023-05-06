'use client'

import Container from '../Container'
import Logo from './Logo'
import UserMenu from './UserMenu'

const NavBar = () => {
  return (
    <div className="fixed z-10 w-full bg-zinc-950 shadow-sm">
      <div className="border-b-[1px] py-4 border-zinc-500 text-white">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default NavBar
