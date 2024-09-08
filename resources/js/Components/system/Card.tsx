import React from 'react'

export default function Card({children}: {children:React.ReactNode}) {
  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900">{children}</div>
    </div>
  )
}

