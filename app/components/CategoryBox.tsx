'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useCallback } from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
  description?: string
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const upadtedQuery: any = {
      ...currentQuery,
      category: label,
    }

    if (params?.get('category') === label) {
      delete upadtedQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: upadtedQuery,
      },
      { skipNull: true },
    )

    router.push(url)
  }, [params, label, router])

  return (
    <div
      onClick={handleClick}
      className={`
      flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-orange-500 
      ${selected ? 'border-orange-500' : 'border-transparent'}
      ${selected ? 'text-orange-500' : 'text-neutral-400'}
      `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  )
}

export default CategoryBox
