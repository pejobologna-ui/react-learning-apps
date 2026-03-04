import { getTodos, addTodo } from './data.js'

// GET all todos
export async function GET(request) {
  const todos = getTodos()
  return Response.json({ 
    todos,
    count: todos.length 
  })
}

// POST create new todo
export async function POST(request) {
  try {
    const body = await request.json()
    
    if (!body.text || body.text.trim() === '') {
      return Response.json(
        { error: 'Text is required' }, 
        { status: 400 }
      )
    }
    
    const newTodo = addTodo(body)
    
    return Response.json({ 
      todo: newTodo,
      message: 'Todo created successfully'
    }, { status: 201 })
    
  } catch (error) {
    return Response.json(
      { error: 'Invalid request body' }, 
      { status: 400 }
    )
  }
}