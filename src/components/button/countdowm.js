import React,{memo} from 'react'

const Countdowm = ({unit, number}) => {
  return (
    <div className='w-[30%] h-[60px] border flex flex-col justify-center items-center bg-gray-100 rounded-sm '>
        <span className='text-[18px] text-gray-800'>{number}</span>
        <span className='text-xs text-gray-700'>{unit}</span>
    </div>
  )
}

export default memo(Countdowm)