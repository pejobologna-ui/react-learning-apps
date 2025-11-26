'use client'

import { useState, useEffect } from 'react'

export default function EffectDemo() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Effect ran! Count is:', count)
  }, [count])
  
import

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">useEffect Demo</h1>
      <p className="text-xl mb-4">Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-6 py-3 rounded"
      >
        Increment
      </button>
    </div>
  )
}