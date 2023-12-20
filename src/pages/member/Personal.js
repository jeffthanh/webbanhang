import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Personal = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null); 
  const localStorageData = window.localStorage.getItem('persist:shop/user');

  const parsedData = JSON.parse(localStorageData);
  const currentid = JSON.parse(parsedData.current);
  const id = currentid ? currentid._id : null;
  
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

    // Call the fetchData function
    fetchData();
  }, []); 


  
  const handleNavigation = (path) => {
    navigate(path, { state: { userData } });
  };
  
  return (
    <div className="w-full min-h-screen flex text-black">
      <div className='w-1/2 mx-auto mt-5'>
        <h1 className='h-75px flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b'>
          <span>Thông tin</span>
        </h1>
        <div className='flex justify-center mt-8'>
          {userData?.image ? (
            <img src={userData.image} alt="User Avatar" style={{ borderRadius: '50%', width: '100px' }} />
          ) : (
            <img
              src="https://res.cloudinary.com/dqbeplqtc/image/upload/v1696129643/thanhjs/logo_bqqqxl.jpg"
              alt="Logo"
              style={{ borderRadius: '50%', width: '100px' }}
            />
          )}
        </div>

        <div className='h-[70px]'></div>
        {userData && (
          <div className='flex flex-col items-start'>
            {userData.fullname ? (
              <p>Họ và tên: {userData.fullname}</p>
            ) : (
              <div className='flex p-2'>
                <p className='font-semibold'>Họ và tên:</p>
                <span>không có dữ liệu</span>
              </div>
            )}
            {userData.phone ? (
              <p>Số điện thoại: {userData.phone}</p>
            ) : (
              <div className='flex p-2'>
                <p className='font-semibold'>Số điện thoại: </p>
                <span>không có dữ liệu</span>
              </div>
            )}
            {userData.address ? (
              <p>Địa chỉ: {userData.address}</p>
            ) : (
              <div className='flex p-2'>
                <p className='font-semibold'>Địa chỉ: </p>
                <span>không có dữ liệu</span>
              </div>
            )}
          </div>
        )}
        <div className='h-[45px]'></div>
        <span  onClick={() => handleNavigation('../edit-info')} className='p-2 border hover:bg-gray-500'>Sửa thông tin</span>
      </div>
    </div>
  );
};

export default Personal;
