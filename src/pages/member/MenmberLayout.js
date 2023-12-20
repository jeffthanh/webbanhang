import React, { memo, useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import path from 'ultils/path';
import { useSelector } from 'react-redux';
import icons from 'ultils/icons';
import { IoMdHome } from "react-icons/io";

const { BiUser, RiLockPasswordFill, AiFillShopping } = icons;

const MenmberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const localStorageData = window.localStorage.getItem('persist:shop/user');
  const parsedData = JSON.parse(localStorageData);
  const currentid = JSON.parse(parsedData.current);
  const id = currentid ? currentid._id : null;


  const [userData, setUserData] = useState(null); // State to store fetched user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedData = JSON.parse(localStorageData);

        const tokenWithQuotes = parsedData.token;
        const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
        if (tokenWithoutQuotes) {
          const headers = {
            Authorization: `Bearer ${tokenWithoutQuotes}`,
            'Content-Type': 'application/json',
          };

          // Make the API request to get user data
          const response = await fetch(`http://localhost:5000/user/${id}`, {
            method: 'GET',
            headers,
          });

          if (response.ok) {
            const data = await response.json();

            // Set the fetched user data to the state
            setUserData(data);
          } else {
            console.error('Error fetching user data:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call the fetchData function unconditionally
    fetchData();
  }, []); // Pass an empty dependency array to useEffect

  if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full min-h-screen flex text-black">
      <div className="p-4 bg-sky-900  flex-1">
        <div className="flex flex-col items-center text-white">
          {userData?.image ? (
            <img src={userData.image} alt="User Avatar" style={{ borderRadius: '50%', width: '100px' }} />
          ) : (
            <img
              src="https://res.cloudinary.com/dqbeplqtc/image/upload/v1696129643/thanhjs/logo_bqqqxl.jpg"
              alt="Logo"
              style={{ borderRadius: '50%', width: '100px' }}
            />
          )}
          <div className='h-[80px]'></div>
          <div className="flex items-center p-2 hover:bg-gray-500 text-[20px]" onClick={() => handleNavigation('personal')}>
            <div className=''>
              <BiUser />
            </div>
            <span>
              Người dùng
            </span>

          </div>
          <div className="flex p-2 items-center hover:bg-gray-500 text-[20px]" onClick={() => handleNavigation('chagepassword')}>
            <div >
              <RiLockPasswordFill />
            </div>
            <span>
              Đổi mật khẩu
            </span>

          </div>
          <div className="flex p-2 items-center hover:bg-gray-500 text-[20px]" onClick={() => handleNavigation('order')}>
            <div>
              <AiFillShopping />
            </div>

            <span>
              Đơn hàng
            </span>

          </div>
          <div className="flex p-2 items-center hover:bg-gray-500 text-[20px]" onClick={() => handleNavigation('../')}>
            <div>
              <IoMdHome />
            </div>
            <span>
              Trang chủ
            </span>

          </div>
        </div>
      </div>
      <div className="bg-white flex-4">
        <Outlet />
      </div>
    </div>
  );
};

export default memo(MenmberLayout);
