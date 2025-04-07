import React from 'react'
import { ComboBoxResponsive } from './ComboBox'

export default function ProductSearch() {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
        <ComboBoxResponsive/>
      </div>
    </div>
  )
}
