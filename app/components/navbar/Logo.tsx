'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { AiOutlineBug } from 'react-icons/ai'

const Logo = () => {
  const router = useRouter()

  return (
    <div className="flex cursor-pointer flex-row items-center gap-2">
      <Image
        onClick={() => router.push('/')}
        alt="Logo"
        className="hidden md:block"
        src="/images/logo.svg"
        height={180}
        width={180}
      />
      <div className="">
        <AiOutlineBug
          className="text-orange-600 hover:text-orange-700"
          size={30}
        />
      </div>
    </div>
  )
}

export default Logo
