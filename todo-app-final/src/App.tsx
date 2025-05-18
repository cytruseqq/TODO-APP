import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import useTodoStore from './store/todoStore';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [user, setUser] = useState<any | null>(null);
  const fetchTodos = useTodoStore((state) => state.fetchTodos);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        fetchTodos(firebaseUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center p-4">
                <div className="w-full max-w-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-semibold text-gray-800 tracking-wide drop-shadow">
                      📝 Twoje zadania
                    </h1>
                    <button
                      onClick={() => signOut(auth)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Wyloguj
                    </button>
                  </div>
                  <TodoForm user={user} />
                  <TodoList />
                </div>
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
