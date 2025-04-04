import React from 'react'
import { FiCpu } from "react-icons/fi";

export default function Reply({content}) {
  return (
    <div className='flex justify-start mb-4'>
        <div className='w-[4%]'>
            <FiCpu className='text-blue-800 text-3xl'/>
        </div>
        <div className='w-[96%]'>{content}</div>
    </div>
  )
}
