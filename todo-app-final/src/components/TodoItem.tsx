// src/components/TodoItem.tsx
import React from 'react'
import { Todo } from '../store/todoStore'
import useTodoStore from '../store/todoStore'
import dayjs from 'dayjs'

const TodoItem = ({ todo }: { todo: Todo }) => {
  const toggleDone = useTodoStore(state => state.toggleDone)
  const deleteTodo = useTodoStore(state => state.deleteTodo)

  const getDueDateColor = (dueDate?: string) => {
    if (!dueDate) return 'text-gray-400'

    const today = dayjs().startOf('day')
    const due = dayjs(dueDate).startOf('day')

    if (due.isBefore(today)) return 'text-red-500'
    if (due.isSame(today)) return 'text-yellow-500'
    return 'text-green-500'
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
      <div>
        <h3 className={`font-bold ${todo.done ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </h3>
        {todo.description && <p className="text-sm text-gray-600">{todo.description}</p>}
        {todo.dueDate && (
          <p className={`text-sm mt-1 ${getDueDateColor(todo.dueDate)}`}>
            Termin: {dayjs(todo.dueDate).format('DD.MM.YYYY')}
          </p>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleDone(todo.id)}
        />
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:text-red-600"
        >
          Usuń
        </button>
      </div>
    </div>
  )
}

export default TodoItem
