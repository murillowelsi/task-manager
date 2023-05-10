'use client'

import { IconType } from 'react-icons'

interface CategoryInputProps {
  icon: IconType
  label: string
  selected: boolean
  onClick: (value: string) => void
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-orange-500
        ${selected ? 'animate-pulse border-orange-500' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  )
}

export default CategoryInput
