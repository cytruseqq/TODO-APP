import React from 'react'
import useTodoStore from '../store/todoStore'
import TodoItem from './TodoItem'

const TodoList = () => {
  const todos = useTodoStore(state => state.todos)

  return (
    <div className="space-y-4">
      {todos.length > 0 ? (
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      ) : (
        <p className="text-gray-500">Brak zadań do wyświetlenia</p>
      )}
    </div>
  )
}

export default TodoList
