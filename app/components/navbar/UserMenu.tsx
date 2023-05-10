'use client'

import useLoginModal from '@/app/hooks/useLoginModal'
import useNewTaskModal from '@/app/hooks/useNewTaskModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'

interface UserMenuProps {
  currentUser?: SafeUser | null
  image?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const newTaskModal = useNewTaskModal()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onNewTask = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    return newTaskModal.onOpen()
  }, [currentUser, newTaskModal, loginModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onNewTask}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-orange-900 md:block"
        >
          Add your tasks
        </div>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-zinc-400 p-4 transition hover:bg-orange-900 md:px-2 md:py-1"
          data-test-id="user-menu"
        >
          <AiOutlineMenu size={20} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            right-0 
            top-12
            w-[40vw]
            overflow-hidden 
            rounded-xl 
            bg-zinc-950 
            text-sm 
            shadow-md 
            md:w-3/4
          "
        >
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem label="My tasks" onClick={onNewTask} />
                <hr className="border-zinc-500" />
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    signOut()
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
