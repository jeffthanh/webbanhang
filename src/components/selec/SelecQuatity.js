import React, { memo } from 'react'

const SelecQuatity = ({quantity, handleQuantity,handleChangeQuantity}) => {
  return (
    <div className='flex items-center'>
      <span onClick={() => handleChangeQuantity('minus')} className=' p-2 cursor-pointer border-r border-black'>-</span>
      <input type='text' className='py-2 w-[50px] outline-none text-center ' value={quantity} onChange={e => handleQuantity(e.target.value)}/> 
      <span onClick={() => handleChangeQuantity('plus')}  className=' p-2 cursor-pointer border-l border-black'>+</span>

    </div>
  )
}

export default memo(SelecQuatity)