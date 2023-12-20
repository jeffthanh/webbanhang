import React from 'react'
import { ProductList } from 'components'

const ManageProduct = () => {
  return (
    <div className='pl-4'>
      <h1 className='h-75px mb-10 flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b'>
        <span>Quản Lý Sản Phẩm</span>
      </h1>
      <ProductList/>
    </div>
  )
}

export default ManageProduct