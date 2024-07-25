import { Owner } from "@/core/models/user";

export module Todo {
  export type T = {
    id: string;
    userId: string;
    title: string;
    status: Status;
    owner?: Owner.T;
  }

  export type Status = 'pending' | 'done'

  export function build(props: Partial<Todo.T>) {
    const todo: T = {
      id: props.id ?? '',
      userId: props.userId ?? '',
      title: props.title ?? '',
      status: props.status ?? 'pending',
      owner: props.owner,
    }
    return todo;
  }

  export function isDone(todo: T) {
    return todo.status === 'done';
  }

  export function toDone(todo: T) {
    return build({ ...todo, status: 'done' })
  }

  export function isOwner(todo: T, ownerId: string) {
    console.log(typeof todo.userId, typeof ownerId)
    return todo.userId === ownerId;
  }
}