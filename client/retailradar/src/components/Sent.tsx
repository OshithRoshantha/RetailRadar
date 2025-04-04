import React from 'react'

export default function Sent({content}) {
  return (
    <div className='flex justify-end mb-4'>
        <div className='bg-blue-100 inline-block px-3 py-2 sent-msg '>{content}</div>
    </div>
  )
}
