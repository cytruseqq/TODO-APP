// src/components/TodoForm.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Timestamp } from 'firebase/firestore'
import useTodoStore from '../store/todoStore'

const schema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany"),
  description: z.string().optional(),
  dueDate: z.string().optional(), // format yyyy-mm-dd
})

type FormData = z.infer<typeof schema>

const TodoForm = ({ user }: { user: { uid: string } }) => {
  const addTodo = useTodoStore(state => state.addTodo)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    await addTodo({
      ...data,
      done: false,
      createdAt: Timestamp.now(),
      userId: user.uid,
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg mb-4">
      <h2 className="text-lg font-bold mb-4">Dodaj nowe zadanie</h2>

      <div className="mb-2">
        <input
          {...register('title')}
          placeholder="Tytuł"
          className="border p-2 w-full rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div className="mb-2">
        <textarea
          {...register('description')}
          placeholder="Opis"
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Termin wykonania</label>
        <input
          type="date"
          {...register('dueDate')}
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Dodaj
      </button>
    </form>
  )
}

export default TodoForm
