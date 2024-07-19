import { Form } from "@/components/todos/form"

export default async function Page(props: {
  params: { todo_id: string }; searchParams: { user_id: string }
}) {
  const todo = await fetch(`https://jsonplaceholder.typicode.com/todos/${props.params.todo_id}`)
    .then(response => response.json())
  const owner = await fetch(`https://jsonplaceholder.typicode.com/users/${props.searchParams.user_id}`)
    .then(response => response.json())
  return (
    <Form todo={todo} owner={owner} />
  )
}