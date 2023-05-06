'use client'

import Image from 'next/image'

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
      <div className="font-bold text-2xl text-orange-600">Bugs</div>
    </div>
  )
}

export default Logo
