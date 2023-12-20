import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Chagepassword = () => {
  const [enteredPassword, setEnteredPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setEnteredPassword(e.target.value);
  };

  const authenticatePassword = async () => {
    try {
      // Get the token from wherever it's stored (localStorage, Redux store, etc.)
      const localStorageData = window.localStorage.getItem('persist:shop/user');
      const parsedData = JSON.parse(localStorageData);
      const tokenWithQuotes = parsedData.token;
      const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);

      // Make an API request to authenticate the password and token
      const response = await fetch('http://localhost:5000/user/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenWithoutQuotes}`, // Include the token in the headers
        },
        body: JSON.stringify({
          oldPassword: enteredPassword,
        }),
      });
      console.log(response.status)
      if (response.status === 200) {
        // Password and token are correct, implement your logic here
        console.log('Password and token are correct');
        navigate("../passwordnew");

      } else {
        // Password or token is incorrect, handle accordingly
        console.log('Password or token is incorrect');
        Swal.fire({
          title: 'Lỗi',
          icon: 'error',
          text: 'Vui lòng nhập password cũ.',
        });
        return;
      }
    } catch (error) {
      console.error('Error authenticating password:', error);
    }
  };


  return (
    <div>
      <div className='w-1/2 mx-auto mt-5'>
        <h1 className='h-75px flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b'>
          <span>Xác Thực Mật Khẩu</span>
        </h1>
        <div className='h-[70px]'></div>
        <div>
          <span className='mr-[15px]'>
            Nhập mật khẩu cũ:
          </span>
          <input type='password' onChange={handlePasswordChange} value={enteredPassword} />
        </div>
        <div className='h-[50px]'></div>

        <div className='flex justify-center'>
          <button className='hover:bg-gray-500 p-2' onClick={authenticatePassword}>
            Xác thực
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chagepassword;
