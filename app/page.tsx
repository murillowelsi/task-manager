import getCurrentUser from './actions/getCurrentUser'
import getTasks from './actions/getTasks'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import TaskCard from './components/tasks/TaskCard'

export default async function Home() {
  const tasks = await getTasks()
  const currentUser = await getCurrentUser()

  if (tasks.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="mt-24 aspect-video w-full columns-2 gap-2 md:columns-3 lg:columns-4">
          {tasks.map((task: any) => (
            <TaskCard currentUser={currentUser} key={task.id} data={task} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}
