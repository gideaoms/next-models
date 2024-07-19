import { Owner } from "@/core/models/user";

export declare module Todo {
  type Props = {
    id: number;
    userId: number;
    title: string;
    status: Status;
    owner: Owner
  }
  type Status = 'pending' | 'done'
}

export class Todo {
  private constructor(
    readonly id: number,
    readonly userId: number,
    readonly title: string,
    readonly status: Todo.Status,
    readonly owner: Owner | undefined,
  ) { }

  static build(props: Partial<Todo.Props>) {
    return new Todo(
      props.id ?? 0,
      props.userId ?? 0,
      props.title ?? '',
      props.status ?? 'pending',
      props.owner,
    )
  }

  isDone() {
    return this.status === 'done';
  }

  toDone() {
    return Todo.build({ ...this, status: 'done' })
  }

  isOwner(ownerId: number) {
    return this.userId === ownerId;
  }
}