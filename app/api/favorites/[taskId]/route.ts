import { NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface IParams {
  taskId?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { taskId } = params

  if (!taskId || typeof taskId !== 'string') {
    throw new Error('Invalid ID')
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds.push(taskId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  })

  return NextResponse.json(user)
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }
  const { taskId } = params

  if (!taskId || typeof taskId !== 'string') {
    throw new Error('Invalid ID')
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds = favoriteIds.filter((id) => id !== taskId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  })

  return NextResponse.json(user)
}
