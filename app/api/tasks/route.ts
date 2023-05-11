import { NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { title, description, category, completed } = body

  const listing = await prisma.task.create({
    data: {
      title,
      description,
      completed,
      category,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}
