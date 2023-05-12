'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { SafeTask, SafeUser } from '@/app/types'
import { format } from 'date-fns'
import Button from '../Button'

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
      className="cursor-pointer"
    >
      <div className="mx-auto max-w-lg overflow-hidden rounded-xl border border-zinc-400 bg-zinc-800 shadow-md">
        <div className="lg:flex">
          <div className="p-8">
            <div className="text-sm font-semibold uppercase tracking-wide text-white">
              {data.title}
            </div>
            <p className="mt-1 block text-sm leading-tight text-orange-600">
              {`${format(data.createdAt, 'PP')}`}
            </p>
            <p className="text-white">{data.category}</p>
            <p className="mt-2 font-extralight text-neutral-300">
              {data.description}
            </p>
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
