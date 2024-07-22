'use client'

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Todo } from '@/core/models/todo';
import { Owner } from '@/core/models/user';
import { Address } from '@/core/models/address';

const schema = z.object({
  title: z.string().min(1),
  completed: z.boolean(),
});

export function Form(props: { todo: Todo }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const form = useForm({
    resolver: zodResolver(schema),
    values: {
      title: props.todo.title,
      completed: props.todo.isDone(),
    },
  });
  const owner = props.todo.owner ?? Owner.empty
  const address = owner.address ?? Address.empty

  async function submit(title: string, completed: boolean) {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${props.todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    router.push(`/?user_id=${searchParams.get('user_id')}`)
  }

  return (
    <form
      className="p-2"
      onSubmit={form.handleSubmit(({ title, completed }) => submit(title, completed))}
    >
      <p>Owner: {owner.name}</p>
      <p>Address: {address.street} - {address.city}</p>
      <div>
        <input
          className="border rounded p-1 border-zinc-600"
          {...form.register('title')}
        />
        {form.formState.errors.title && (
          <p className='text-xs text-red-400'>{form.formState.errors.title.message}</p>
        )}
      </div>
      <div>
        <input
          type='checkbox'
          id="completed"
          {...form.register('completed')}
        />
        <label htmlFor='completed'>Completed?</label>
      </div>
      <button
        type='submit'
        className='border bg-emerald-500 px-2 py-1 text-white rounded'
      >Save</button>
    </form>
  )
}