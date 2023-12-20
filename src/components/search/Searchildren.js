import React, { memo } from 'react'
import icons from '../../ultils/icons';

const {AiOutlineDown} = icons
const Searchildren = ({name,activeClick,changeActiveFitler}) => {
  return (
    <div onClick={() =>
      changeActiveFitler(name)
    } className='p-3 border text-xs gap-5 border-gray-800 flex relative justify-between items-center '>
      <span className='capitalize'>{name}</span>
      <AiOutlineDown/>
      {activeClick === name && <div className='absolute top-full left-0 w-fit p-4 bg'>
        
      </div>}
    </div>

    )
}

export default memo(Searchildren)