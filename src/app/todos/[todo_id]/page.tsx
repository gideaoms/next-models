import { Form } from "@/components/todos/form"
import { Todo } from "@/core/models/todo";
import { Owner } from "@/core/models/user";
import { todo } from "node:test";

export default async function Page(props: {
  params: { todo_id: string }; searchParams: { user_id: string }
}) {
  const todoAsJson = await fetch(`https://jsonplaceholder.typicode.com/todos/${props.params.todo_id}`)
    .then(response => response.json())
  const ownerAsJson = await fetch(`https://jsonplaceholder.typicode.com/users/${props.searchParams.user_id}`)
    .then(response => response.json())
  const todo = Todo.build({
    id: todoAsJson.id,
    userId: todoAsJson.userId,
    title: todoAsJson.title,
    status: todoAsJson.completed ? 'done' : 'pending',
    owner: Owner.build({
      id: ownerAsJson.id,
      name: ownerAsJson.name,
    }),
  })
  return (
    <Form todo={todo} />
  )
}