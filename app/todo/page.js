'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ToDoItem from '../Components/ToDoItem'

import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

export default function TodoApp() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
  if (!authLoading && !user) {
    router.push('/login')
    }
  }, [user, authLoading, router])


  // Fetch todos from database on mount
  useEffect(() => {
    if (user) {
      fetchTodos()
    }
  }, [user])

  const fetchTodos = async () => {
    if (!user) return
    
    setLoading(true)
    
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching todos:', error)
      alert('Failed to load todos: ' + error.message)
    } else {
      setTasks(data || [])
    }
    
    setLoading(false)
  }

  const addTask = async () => {
    if (inputValue.trim() === '') {
      alert('Please enter a task')
      return
    }
  
    const { data, error } = await supabase
      .from('todos')
      .insert({ 
        text: inputValue, 
        completed: false,
        user_id: user.id
      })
      .select()
  
    if (error) {
      console.error('Insert error:', error)
      alert('Failed to add task: ' + error.message)
    } else {
      setInputValue('')
      fetchTodos()
    }
  }

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Failed to delete task: ' + error.message)
    } else {
      fetchTodos()
    }
  }

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    const { error } = await supabase
      .from('todos')
      .update({ completed: !task.completed })
      .eq('id', id)

    if (error) {
      alert('Failed to update task: ' + error.message)
    } else {
      fetchTodos()
    }
  }

  const clearCompleted = async () => {
    const completedIds = tasks.filter(t => t.completed).map(t => t.id)
    
    const { error } = await supabase
      .from('todos')
      .delete()
      .in('id', completedIds)

    if (error) {
      alert('Failed to clear completed: ' + error.message)
    } else {
      fetchTodos()
    }
  }

  const getFilteredTasks = () => {
    if (filter === 'active') return tasks.filter(t => !t.completed)
    if (filter === 'completed') return tasks.filter(t => t.completed)
    return tasks
  }

  if (loading) {
    return (
      <main className="p-8 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">React Todo App</h1>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading from database...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="p-8 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          React Todo App
        </h1>
        <button
          onClick={signOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
  
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="What needs to be done?"
          className="flex-1 border-2 border-gray-300 text-black rounded-lg px-4 py-3 text-lg focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 font-semibold"
        >
          Add
        </button>
      </div>
  
      <div className="flex gap-2 mb-4 justify-center">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-lg font-semibold ${
            filter === 'all' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-6 py-2 rounded-lg font-semibold ${
            filter === 'active' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-6 py-2 rounded-lg font-semibold ${
            filter === 'completed' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completed
        </button>
      </div>
  
      <div>
        {getFilteredTasks().length === 0 ? (
          <p className="text-center text-gray-400 py-12 text-lg">
            {filter === 'all' ? 'No tasks yet. Add one above! 🎯' : 
             filter === 'active' ? 'No active tasks! 🎉' : 
             'No completed tasks yet.'}
          </p>
        ) : (
          getFilteredTasks().map(task => (
            <ToDoItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          ))
        )}
      </div>
  
      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg text-gray-600">
          Total: {tasks.length} | 
          Completed: {tasks.filter(t => t.completed).length} | 
          Active: {tasks.filter(t => !t.completed).length}
        </p>
        
        {tasks.some(t => t.completed) && (
          <button
            onClick={clearCompleted}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Completed
          </button>
        )}
      </div>
  
      <p className="text-center text-sm text-gray-500 mt-8">
        💾 Data saved to database permanently
      </p>
    </main>
  )
}