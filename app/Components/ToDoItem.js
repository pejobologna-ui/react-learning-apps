'use client'

export default function ToDoItem({ task, onDelete, onToggle }) {
  return (
    <div className="flex items-center gap-3 p-4 text-black bg-white rounded-lg shadow mb-2">
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() =>onToggle(task.id)} 
        className="w-5 h-5 cursor-pointer" 
      />

      <span className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
        {task.text}
      </span>
      
      <button onClick={() => onDelete(task.id)} 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Delete
      </button>
    </div>
  )
}