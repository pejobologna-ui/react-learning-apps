import { getTodoById, updateTodo, deleteTodo } from '../data.js'

// GET single todo
export async function GET(request, { params }) {
  const id = parseInt(params.id)
  const todo = getTodoById(id)
  
  if (!todo) {
    return Response.json(
      { error: 'Todo not found' }, 
      { status: 404 }
    )
  }
  
  return Response.json({ todo })
}

// PATCH update todo
export async function PATCH(request, { params }) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    
    const updatedTodo = updateTodo(id, body)
    
    if (!updatedTodo) {
      return Response.json(
        { error: 'Todo not found' }, 
        { status: 404 }
      )
    }
    
    return Response.json({ 
      todo: updatedTodo,
      message: 'Todo updated successfully'
    })
    
  } catch (error) {
    return Response.json(
      { error: 'Invalid request body' }, 
      { status: 400 }
    )
  }
}

// DELETE todo
export async function DELETE(request, { params }) {
  const id = parseInt(params.id)
  
  const deletedTodo = deleteTodo(id)
  
  if (!deletedTodo) {
    return Response.json(
      { error: 'Todo not found' }, 
      { status: 404 }
    )
  }
  
  return Response.json({ 
    todo: deletedTodo,
    message: 'Todo deleted successfully'
  })
}