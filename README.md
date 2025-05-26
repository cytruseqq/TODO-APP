# ✅ Todo List App – React + Firebase + Zustand

Aplikacja Todo List stworzona w React z integracją Firebase (Firestore + Authentication) oraz Zustand jako lokalnym stanem. Obsługuje pracę offline i synchronizację z Firestore po odzyskaniu połączenia.

## 🔧 Technologie

- **React**
- **Firebase** (Firestore + Auth)
- **Zustand** – zarządzanie stanem
- **React Hook Form** + **Zod** – walidacja formularza
- **Tailwind CSS** (opcjonalnie, jeśli użyto)
- **PWA** (jeśli aplikacja wspiera offline w pełni)

---

## ✨ Funkcjonalność

### 🔒 Logowanie użytkownika
- Firebase Authentication (Google / e-mail+hasło)
- Po zalogowaniu użytkownik widzi tylko swoje zadania

### ✅ Zadania (todos)
Każde zadanie to dokument w kolekcji `todos` w Firestore:

```ts
{
  id: string,
  title: string,
  description: string,
  done: boolean,
  createdAt: Timestamp,
  dueDate?: Timestamp
}

📦 Zarządzanie stanem (Zustand)
todos przechowywane lokalnie

Komponenty korzystają tylko z danych ze stanu lokalnego

Zmiany: najpierw lokalnie, potem Firestore

🕸️ Offline & Synchronizacja
Aplikacja działa offline dzięki lokalnemu stanowi

Po odzyskaniu sieci – zmiany synchronizują się z Firestore

Błędy zapisu do Firestore powodują rollback (cofnięcie lokalnej zmiany)

🧠 Architektura Zustand Store
ts
Kopiuj
Edytuj
import { create } from 'zustand'
import { db } from './firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

const useTodoStore = create((set, get) => ({
  todos: [],
  fetchTodos: async () => { ... },
  addTodo: async (newTodo) => { ... },
  toggleDone: async (id) => {
    const todo = get().todos.find(t => t.id === id)
    const previousDone = todo.done
    set(...lokalna zmiana...)
    try {
      await updateDoc(...)
    } catch (err) {
      console.error('Rollback')
      set(...przywrócenie wartości...)
    }
  },
  deleteTodo: async (id) => { ... }
}))
📋 Komponenty aplikacji
TodoForm
Dodawanie nowych zadań

Walidacja z użyciem React Hook Form + Zod

TodoList
Wyświetla listę zadań z Zustanda

Obsługuje filtrowanie i sortowanie (opcjonalnie)

TodoItem
Jedno zadanie

Możliwość oznaczenia jako ukończone / usunięcia

🕒 Dodatkowe funkcje
dueDate: termin wykonania zadania

Zadania zbliżające się do terminu są oznaczane innym kolorem

Zadania po terminie są dodatkowo wyróżnione

🛠️ Firebase Setup
Skonfiguruj projekt Firebase

Włącz Authentication i dodaj domeny do Authorized domains (np. todoapka.web.app)

Skonfiguruj Firestore – kolekcja todos

Użyj signInWithPopup lub signInWithRedirect do logowania przez Google

🔮 Przyszłe rozszerzenia (opcjonalne)
Powiadomienia push o zbliżających się zadaniach

Filtrowanie zadań (ukończone / nieukończone / po terminie)

Podział na listy zadań / tagi

Drag & Drop kolejności

🧪 Demo
🔗 Zobacz działającą wersję

📜 Licencja
Projekt edukacyjny. Można korzystać, uczyć się i rozwijać ✌️
