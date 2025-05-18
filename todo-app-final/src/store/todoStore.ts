// src/store/todoStore.tsx
import { create } from 'zustand'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'

export type Todo = {
  id: string
  title: string
  description?: string
  done: boolean
  createdAt: any
  dueDate?: string
  userId: string
}

const useTodoStore = create((set, get) => ({
  todos: [] as Todo[],

  fetchTodos: async (userId: string) => {
    try {
      const q = query(collection(db, 'todos'), where('userId', '==', userId))
      const snapshot = await getDocs(q)
      const todos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Todo[]
      set({ todos })
    } catch (error) {
      console.error('Błąd przy pobieraniu zadań:', error)
    }
  },

  addTodo: async (newTodo: Omit<Todo, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        ...newTodo,
        createdAt: serverTimestamp(),
      })
      set(state => ({
        todos: [...state.todos, { id: docRef.id, ...newTodo }]
      }))
    } catch (error) {
      console.error('Błąd przy dodawaniu zadania:', error)
    }
  },

  toggleDone: async (id: string) => {
    const todo = get().todos.find(t => t.id === id)
    if (!todo) return

    const previousDone = todo.done

    set(state => ({
      todos: state.todos.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    }))

    try {
      const todoRef = doc(db, 'todos', id)
      await updateDoc(todoRef, { done: !previousDone })
    } catch (error) {
      console.error('Błąd Firestore, cofanie zmiany:', error)
      set(state => ({
        todos: state.todos.map(t =>
          t.id === id ? { ...t, done: previousDone } : t
        )
      }))
    }
  },

  deleteTodo: async (id: string) => {
    const previousTodos = get().todos
    set(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }))

    try {
      await deleteDoc(doc(db, 'todos', id))
    } catch (error) {
      console.error('Błąd Firestore, cofanie usunięcia:', error)
      set({ todos: previousTodos })
    }
  },
}))

export default useTodoStore
