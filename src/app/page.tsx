import { Todo } from "@/core/models/todo";
import Link from "next/link";

export default async function Page(props: { searchParams: { user_id: string } }) {
  const userId = props.searchParams.user_id
  if (!userId) {
    return <p className="text-red-500">You are not logged in</p>
  }
  const todosAsJson = await fetch("http://localhost:3001/todos", { cache: 'no-cache' })
    .then<any[]>((response) => response.json());
  const todos = todosAsJson.map((todoAsJson: any) => Todo.build({
    id: todoAsJson.id,
    userId: todoAsJson.userId,
    title: todoAsJson.title,
    status: todoAsJson.completed ? 'done' : 'pending',
  }))

  return (
    <ul className="p-2 space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="border rounded p-2 flex flex-col gap-2 items-start">
          <p className="bold">{todo.title}</p>
          <p
            className="text-xs text-zinc-600"
          >
            {Todo.isDone(todo) ? 'It is completed' : 'It is NOT completed'}
          </p>
          {Todo.isOwner(todo, userId) && (
            <Link
              href={`/todos/${todo.id}?user_id=${userId}`}
              className="border bg-emerald-500 px-2 py-1 text-white rounded"
            >Edit</Link>
          )}
        </li>
      ))}
    </ul>
  )
}
