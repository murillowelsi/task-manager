'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { SafeTask, SafeUser } from '@/app/types'
import Button from '../Button'
import HeartButton from '../HeartButton'

interface TaskCardProps {
  data: SafeTask
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

const TaskCard: React.FC<TaskCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter()

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [disabled, onAction, actionId],
  )

  return (
    <div
      onClick={() => router.push(`/tasks/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div
          className="
            relative 
            aspect-square 
            w-full 
            overflow-hidden 
            rounded-xl
          "
        >
          <div
            className="
              h-full 
              w-full 
              object-cover 
              transition 
              group-hover:scale-110
            "
          />
          <div
            className="
            absolute
            right-3
            top-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
      </div>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  )
}

export default TaskCard