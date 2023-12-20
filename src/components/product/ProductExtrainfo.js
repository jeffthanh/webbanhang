import React, { memo } from 'react'

const ProductExtrainfo = ({icon, title, sub}) => {
  return (
    <div className='flex items-center ml-2 p-3 gap-4 mb-[10px] border'>
        <span className='p-2 bg-gray-500 text-white rounded-full flex items-center justify-center'>{icon}</span>
        <div className='flex flex-col text-sm text-gray-500'>
            <span className='font-medium'>{title}</span>
            <span>{sub}</span>
        </div>
    </div>
  )
}

export default memo(ProductExtrainfo)