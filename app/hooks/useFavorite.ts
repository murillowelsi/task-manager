import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'

import { SafeUser } from '@/app/types'

import useLoginModal from './useLoginModal'

interface IUseFavorite {
  taskId: string
  currentUser?: SafeUser | null
}

const useFavorite = ({ taskId, currentUser }: IUseFavorite) => {
  const router = useRouter()

  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(taskId)
  }, [currentUser, taskId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        return loginModal.onOpen()
      }

      try {
        let request

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${taskId}`)
        } else {
          request = () => axios.post(`/api/favorites/${taskId}`)
        }

        await request()
        router.refresh()
        toast.success('Success')
      } catch (error) {
        toast.error('Something went wrong.')
      }
    },
    [currentUser, hasFavorited, taskId, loginModal, router],
  )

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite
