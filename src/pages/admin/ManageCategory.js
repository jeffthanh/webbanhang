import React from 'react'
import { GetCategory } from 'components'
const ManageCategory = () => {
  return (
    <div className='pl-4'>
      <h1 className='h-75px mb-10 flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b'>
        <span>Quản Lý Danh Mục</span>
      </h1>
      <GetCategory />
    </div>
  )
}

export default ManageCategory