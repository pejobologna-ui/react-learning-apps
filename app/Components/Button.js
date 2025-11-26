export default function Button({ text, color, onClick }) {
  const colorClass = color === 'red' 
    ? 'bg-red-500 hover:bg-red-600' 
    : color === 'green'
    ? 'bg-green-500 hover:bg-green-600'
    : 'bg-blue-500 hover:bg-blue-600'

  return (
    <button 
      onClick={onClick}
      className={`${colorClass} text-white px-6 py-3 rounded mb-2`}
    >
      {text}
    </button>
  )
}