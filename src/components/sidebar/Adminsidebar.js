import React, { Fragment, memo, useState } from 'react';
import { adminSidebar } from 'ultils/contants';
import { NavLink } from 'react-router-dom';
import { AiOutlineDown, AiOutlineCaretRight } from 'react-icons/ai';
import icons from 'ultils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, clearMessage } from 'store/user/userslice';

const { AiOutlineLogout } = icons;
const activeStyle = 'px-4 py-2 flex items-center gap-2 text-lg  text-gray-200 bg-gray-500';
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 text-lg  text-gray-200';

const Adminsidebar = () => {
  const [active, setActive] = useState([]);
  const dispatch = useDispatch();

  const handleShowTabs = (tabId) => {
    setActive((prev) => {
      if (prev) {
        if (prev.some((el) => el === tabId)) {
          return prev.filter((el) => el !== tabId);
        } else {
          return [...prev, tabId];
        }
      }
      return [tabId];
    });
  };

  return (
    <div className='p-4 bg-sky-900 h-full '>
      <div className='flex justify-center gap-2 items-center flex-col mb-20'>
        <img
          src='https://res.cloudinary.com/dqbeplqtc/image/upload/v1697191210/thanhjs/78-786207_user-avatar-png-user-avatar-icon-png-transparent_hpm97m.png'
          alt=''
          className='w-[100px] object-contain'
        />
      </div>
      <div>
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === 'SINGLE' && (
              <NavLink
                to={el.path}
                className={`${el.active ? activeStyle : notActiveStyle} hover:bg-gray-400`}
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === 'PARENT' && (
              <div className='px-4 py-2 flex flex-col text-gray-200 text-lg cursor-pointer' onClick={() => handleShowTabs(+el.id)}>
                <div className='flex items-center gap-2'>
                  <div className='text-[16px] flex'>
                    <span>{el.icon}</span>
                    <div className='w-[8px]'></div>
                    <span>{el.text}</span>
                  </div>
                  {active.some((id) => +id === el.id) ? <AiOutlineCaretRight /> : <AiOutlineDown />}
                </div>
                {active.some((id) => +id === el.id) && (
                  <div className='flex flex-col pl-8 '>
                    {el.submenu.map((item) => (
                      <NavLink
                        key={item.text}
                        to={item.path}
                        onClick={() => handleShowTabs(item.path)}
                        className='text-gray-200 hover:bg-gray-400'
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}

          </Fragment>
        ))}
      </div>
      <span className='px-4 py-2 flex items-center gap-2 text-gray-200 '>
        <AiOutlineLogout size={15}  />
        <span  onClick={() => dispatch(logout())}>Logout</span>
      </span>
    </div>
  );
};

export default memo(Adminsidebar);
