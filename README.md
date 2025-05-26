# ✅ Todo List App – React + Firebase + Zustand
---
Autorzy: Witów Adrian 21319, Czyżewska Magdalena 21227
---

Aplikacja Todo List stworzona w React z integracją Firebase (Firestore + Authentication) oraz Zustand jako lokalnym stanem. Obsługuje pracę offline i synchronizację z Firestore po odzyskaniu połączenia.

---

## 🔧 Technologie

- **React**
- **Firebase**
  - Firestore
  - Authentication (Google, Email/Password)
- **Zustand** – zarządzanie stanem
- **React Hook Form** + **Zod** – walidacja formularzy
- **Tailwind CSS**

---

## ✨ Funkcjonalność

### 🔒 Logowanie użytkownika
- Firebase Authentication (Google / e-mail + hasło)
- Po zalogowaniu użytkownik widzi **tylko swoje zadania**

### 📝 Zadania (`todos`)
Każde zadanie to dokument w kolekcji `todos` w Firestore:

```ts
{
  id: string,
  title: string,
  description: string,
  done: boolean,
  createdAt: Timestamp,
  dueDate?: Timestamp // (opcjonalnie)
}
```

### ⚙️ Stan aplikacji (Zustand)
- `todos` przechowywane lokalnie
- Komponenty korzystają tylko z danych z Zustand
- Zmiany:
  - najpierw lokalnie (optimistic update)
  - potem aktualizacja w Firestore
  - w razie błędu: rollback do poprzedniego stanu

---

## 🔄 Obsługa offline

- Aplikacja działa offline dzięki lokalnemu Zustand
- Po odzyskaniu sieci następuje **synchronizacja z Firestore**
- Błędy zapisu (np. brak internetu) są obsługiwane:
  - dane lokalne są przywracane do poprzedniego stanu

---

## 🧠 Architektura Zustand Store (skrót)

```ts
const useTodoStore = create((set, get) => ({
  todos: [],
  fetchTodos: async () => { ... },
  addTodo: async (newTodo) => { ... },
  toggleDone: async (id) => {
    const todo = get().todos.find(t => t.id === id)
    const previousDone = todo.done
    set(...zmiana lokalna...)
    try {
      await updateDoc(...)
    } catch (err) {
      console.error('Błąd Firestore – cofanie zmiany')
      set(...rollback...)
    }
  },
  deleteTodo: async (id) => { ... }
}))
```

---

## 🧩 Komponenty aplikacji

### `TodoForm`
- Formularz do dodawania zadań
- Walidacja przy użyciu React Hook Form + Zod

### `TodoList`
- Wyświetla listę zadań z lokalnego stanu

### `TodoItem`
- Jedno zadanie
- Możliwość oznaczenia jako ukończone lub usunięcia

---

## ⏰ Dodatkowe funkcje

- **dueDate** – termin wykonania zadania
- Zadania zbliżające się do terminu są oznaczone kolorem
- Zadania po terminie są specjalnie wyróżnione

---

## 🔧 Firebase Setup – ważne!

1. Włącz Authentication (Google, Email/Password)
2. Dodaj swoje domeny do **Authorized Domains**
   - Przykład: `todoapka.web.app`, `apka-projekt.web.app`
3. Skonfiguruj Firestore – kolekcja `todos`
4. Użyj `signInWithPopup` lub `signInWithRedirect` dla logowania

> 🔥 Jeśli logowanie nie działa – upewnij się, że Twoja domena jest dodana w **Authentication → Settings → Authorized Domains**

---

## 🧪 Strona

🔗 [Zobacz działającą wersję](https://todoapka.web.app)

---

## 📜 Licencja

Projekt edukacyjny. Można korzystać, rozwijać, rozbudowywać ✌️

---

## 📁 Struktura plików (opcjonalnie)

```
src/
├── components/
│   ├── TodoForm.jsx
│   ├── TodoList.jsx
│   └── TodoItem.jsx
├── store/
│   └── todoStore.js
├── firebase.js
├── App.jsx
└── main.jsx
```
