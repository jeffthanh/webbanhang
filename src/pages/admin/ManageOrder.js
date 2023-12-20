import React from 'react'
import {GetOrder} from 'components'
const ManageOrder = () => {
  return (
    <div className='pl-4'>
      <h1 className='h-75px mb-10 flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b'>
        <span>Quản Lý Đơn Hàng</span>
      </h1>
      <GetOrder/>
    </div>
  )
}

export default ManageOrder