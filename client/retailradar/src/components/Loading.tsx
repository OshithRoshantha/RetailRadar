import React from 'react'
import { FiCpu } from "react-icons/fi";
import { SyncLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className='flex justify-start mb-4'>
        <div className='w-[4%]'>
            <FiCpu className='text-blue-800 text-3xl'/>
        </div>
        <div className='w-[96%]'>
            <SyncLoader
                color="#193cb8"
                speedMultiplier={0.7}
                size={10}
            />
        </div>
    </div>
  )
}
