import React from 'react'

const SelectOption = ({icon}) => {
  return (
    <div className='w-10 h-10 bg-white rounded-full border shadow-md flex items-center cursor-pointer justify-center hover:bg-gray-700 hover:border-gray-700 hover:text-white'>{icon}</div>
  )
}

export default SelectOption