'use client'

import { useState } from 'react'

export default function Counter({ startValue = 0, title }) {
  const [count, setCount] = useState(startValue)

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-sm">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      
      <p className="text-4xl font-bold text-center mb-4 text-blue-600">
        {count}
      </p>
      
      <div className="flex gap-2">
        <button
          onClick={() => setCount(count - 1)}
          className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          -
        </button>
        <button
          onClick={() => setCount(startValue)}
          className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  )
}