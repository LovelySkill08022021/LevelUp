import React from 'react'

export default function ContentLayout({children}:{children: React.ReactNode}) {
  return (
    <div className="py-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {children}
        </div>
    </div>
  )
}
