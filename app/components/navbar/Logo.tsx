'use client'

import Image from 'next/image'

import { AiOutlineBug } from 'react-icons/ai'

const Logo = () => {
  return (
    <div className="cursor-pointer flex flex-row gap-2 items-center">
      <Image
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
