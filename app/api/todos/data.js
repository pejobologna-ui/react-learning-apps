// Shared in-memory storage
export let todos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build API', completed: false },
    { id: 3, text: 'Deploy app', completed: true }
  ]
  
  export let nextId = 4
  
  export function getTodos() {
    return todos
  }
  
  export function getTodoById(id) {
    return todos.find(t => t.id === id)
  }
  
  export function addTodo(todo) {
    const newTodo = {
      id: nextId++,
      text: todo.text,
      completed: todo.completed || false
    }
    todos.push(newTodo)
    return newTodo
  }
  
  export function updateTodo(id, updates) {
    const index = todos.findIndex(t => t.id === id)
    if (index === -1) return null
    
    todos[index] = { ...todos[index], ...updates }
    return todos[index]
  }
  
  export function deleteTodo(id) {
    const index = todos.findIndex(t => t.id === id)
    if (index === -1) return null
    
    const deleted = todos[index]
    todos.splice(index, 1)
    return deleted
  }