# Todo App - Technical Implementation Plan

## Project Overview

Simple todo application with React 19, Vite, shadcn/ui, and Tailwind v4. Features: add, view, edit, delete, and toggle todos with just todo title.

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React hooks (useState, useEffect)
- **Data Persistence**: localStorage
- **Form Handling**: react-hook-form with zod validation

## Implementation Plan

### Phase 1: Core Types & Data Models

**File: `src/types/todo.ts`**

- Todo interface (id, title, completed, createdAt, updatedAt)
- TodoFormData type for form validation

### Phase 2: Todo Services & Utils

**File: `src/services/todoService.ts`**

- CRUD operations for localStorage
- Functions: getTodos, addTodo, updateTodo, deleteTodo, toggleTodo

**File: `src/hooks/useTodos.ts`**

- Custom hook for todo state management
- Handle loading, error states, and CRUD operations

### Phase 3: UI Components

**File: `src/components/todo/TodoItem.tsx`**

- Individual todo display component
- Toggle completion, edit inline, delete functionality
- Uses: Button, Checkbox, Input from shadcn/ui

**File: `src/components/todo/TodoList.tsx`**

- Container for all todos
- Empty state handling
- Uses: ScrollArea from shadcn/ui

**File: `src/components/todo/AddTodoForm.tsx`**

- Form to add new todos
- Input validation with zod
- Uses: Form, Input, Button from shadcn/ui

**File: `src/components/todo/TodoStats.tsx`**

- Display total, completed, and pending todos
- Uses: Card from shadcn/ui

### Phase 4: Main Application Layout

**File: `src/pages/TodoApp.tsx`**

- Main todo application page
- Combines all todo components
- Layout structure with proper spacing

**File: `src/App.tsx`** (Update existing)

- Import and render TodoApp component
- Basic app layout and container

### Phase 5: Styling & Polish

**File: `src/styles/todo.css`** (if needed)

- Custom styles for todo-specific components
- Animations for add/delete actions

**Update: `src/styles/index.css`**

- Global styles and Tailwind customizations

### Phase 6: Form Validation

**File: `src/lib/validations/todo.ts`**

- Zod schemas for todo validation
- Form validation rules

## API Structure (localStorage)

Since this is a simple app, we'll use localStorage:

- `todos`: Array of todo objects
- Auto-generate UUIDs for todo IDs
- Persist state across browser sessions

## Component Hierarchy

```
App
└── TodoApp
    ├── AddTodoForm
    ├── TodoStats
    └── TodoList
        └── TodoItem (multiple)
```

## Key Features Implementation

1. **Add Todo**: Form with title input and submit
2. **Display Todos**: List view with completion status
3. **Toggle Complete**: Checkbox to mark done/undone
4. **Edit Todo**: Inline editing of todo title
5. **Delete Todo**: Remove todo with confirmation
6. **Stats**: Show counts of total/completed/pending
7. **Persistence**: localStorage for data persistence
8. **Responsive**: Mobile-friendly design

## File Structure Summary

```
src/
├── components/
│   └── todo/
│       ├── AddTodoForm.tsx
│       ├── TodoItem.tsx
│       ├── TodoList.tsx
│       └── TodoStats.tsx
├── hooks/
│   └── useTodos.ts
├── lib/
│   └── validations/
│       └── todo.ts
├── pages/
│   └── TodoApp.tsx
├── services/
│   └── todoService.ts
├── types/
│   └── todo.ts
└── App.tsx (update)
```

## Implementation Order

1. Types and data models
2. LocalStorage service functions
3. Custom hooks for state management
4. UI components (form → item → list → stats)
5. Main page assembly
6. Styling and polish
7. Testing and refinement
