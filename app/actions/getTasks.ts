import prisma from '@/app/libs/prismadb'

export default async function getTasks() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return tasks
  } catch (error: any) {
    throw new Error(error)
  }
}
