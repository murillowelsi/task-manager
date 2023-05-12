import getCurrentUser from './actions/getCurrentUser'
import getTasks from './actions/getTasks'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import TaskCard from './components/tasks/TaskCard'

export default async function Home() {
  const tasks = await getTasks()
  const currentUser = await getCurrentUser()

  // const isEmpty = true

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
        <div
          className="flex flex-row
            gap-8 
            pt-24 
          "
        >
          {tasks.map((task: any) => (
            <TaskCard currentUser={currentUser} key={task.id} data={task} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}
