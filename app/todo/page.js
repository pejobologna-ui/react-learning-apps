'use client'

import { useState } from 'react'
import ToDoItem from '../Components/ToDoItem'

export default function TodoApp() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTask = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a task')
      return
    }

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }

    setTasks([...tasks, newTask])
    setInputValue('')
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  const [filter, setFilter] = useState('all')
  const getFilteredTasks = () => {
    if (filter === 'active') return tasks.filter(t => !t.completed)
    if (filter === 'completed') return tasks.filter(t => t.completed)
    return tasks
  }

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed))
  }


  return (
    <main className="p-8 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        React Todo App
      </h1>

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

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg text-gray-600 font-semibold">
          Total: {tasks.length} | 
          Completed: {tasks.filter(t => t.completed).length} | 
          Active: {tasks.filter(t => !t.completed).length}
        </p>
        
        {tasks.some(t => t.completed) && (
          <button
            onClick={clearCompleted}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
          >
            Clear Completed
          </button>
        )}
      </div>

      <div>
        {tasks.length === 0 ? 
          <p className="text-center text-gray-400 py-12 text-lg">
            No tasks yet. Add one above! 🎯
          </p>
          : 
          getFilteredTasks().map(task => 
            <ToDoItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          )}
      </div>

      <div className="mt-6 text-center text-gray-600">
        <p className="text-lg">
          Total: {getFilteredTasks().length} | 
          Completed: {getFilteredTasks().filter(t => t.completed).length} | 
          Active: {getFilteredTasks().filter(t => !t.completed).length}
        </p>
      </div>
    </main>
  )
}