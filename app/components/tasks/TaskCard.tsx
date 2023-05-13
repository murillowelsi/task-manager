'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { SafeTask, SafeUser } from '@/app/types'
import { format } from 'date-fns'
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
      className="group relative w-full cursor-pointer px-2 py-2"
      onClick={() => router.push(`/tasks/${data.id}`)}
    >
      <div className="absolute right-3 top-3 mx-2 mt-2">
        <HeartButton taskId={data.id} currentUser={currentUser} />
      </div>
      <div className="mx-auto max-w-lg overflow-hidden rounded-2xl bg-zinc-800 shadow-md hover:border-[1px] hover:border-orange-500">
        <div className="p-6">
          <div className="text-sm font-semibold uppercase tracking-wide text-white">
            {data.title}
          </div>
          <div>
            <p className="mb-2 block text-sm leading-tight text-orange-500">
              {`${format(data.createdAt, 'PP')}`}
            </p>
            <p className="mt-4 font-mono font-thin text-neutral-300">
              {data.description}
            </p>
          </div>
          <div className="mt-8">
            <span className="whitespace-nowrap rounded-full bg-orange-100 px-2.5 py-0.5 text-sm text-orange-700">
              {data.category}
            </span>
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
