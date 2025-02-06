import React from 'react'

export default function CreditCard({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full sm:w-[200px] border border-gray-300 inline-block p-2 rounded-lg'>
            {children}
        </div>
    )
}
