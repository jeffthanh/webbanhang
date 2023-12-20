import React, { memo } from 'react';

const Button = ({ children, handleOnclick, style, fw }) => {
  return (
    <button
      type='button'
      onClick={() => {
        handleOnclick && handleOnclick();
      }}
      className={style ? style : `px-4 py-2 h-[40px] rounded-md text-white my-2 bg-main text-semibold ${fw ? 'w-full' : 'w-fit'}`}
    >
      {children}
    </button>
  );
}

export default memo(Button);
