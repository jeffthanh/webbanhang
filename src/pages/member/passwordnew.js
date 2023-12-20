import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Passwordnew = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword === confirmPassword) {
            try {
                const response = await changePasswordAPI({ newPassword });

                if (response.ok) {
                    console.log('Password changed successfully');
                    // Optionally, you can redirect the user or perform other actions
                    Swal.fire({
                        title: 'Thành công',
                        icon: 'success',
                        text: 'Đổi mật khẩu thành công!',
                    });
                } else {
                    const data = await response.json();
                    setErrorMessage(data.message || 'Error changing password');
                }
            } catch (error) {
                console.error('Error changing password:', error);
                setErrorMessage('Error changing password');
            }
        } else {
            Swal.fire({
                title: 'Lỗi',
                icon: 'error',
                text: 'Vui lòng nhập trùng khớp mật khẩu mới',
            });
        }
    };

    const changePasswordAPI = async ({ newPassword }) => {
        const localStorageData = window.localStorage.getItem('persist:shop/user');
        const parsedData = JSON.parse(localStorageData);
        const tokenWithQuotes = parsedData.token;
        const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
        console.log(newPassword)
        try {
            const response = await fetch('http://localhost:5000/user/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenWithoutQuotes}`, // Include the token in the headers
                },
                body: JSON.stringify({password: newPassword }),
            });
            if(response){
                navigate("../personal");
                Swal.fire({
                    title: 'Thành công',
                    icon: 'success',
                    text: 'Danh mục đã được thêm thành công.',
                  });
                window.location.reload();
                // return response;
            }
            
        } catch (error) {
            console.error('Error in changePasswordAPI:', error);
            throw error;
        }
    };

    return (
        <div>
            <div className='w-1/2 mx-auto mt-5'>
                <h1 className='h-75px flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b'>
                    <span>Thay Đổi Mật Khẩu</span>
                </h1>
            </div>
            <div className='h-[100px]'></div>

            <form onSubmit={handleSubmit}>
                <div className='w-1/2 mx-auto p-2'>
                    <label htmlFor="newPassword">Mật khẩu mới:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                </div>
                <div className='w-1/2 mx-auto p-2 '>
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <div className='flex justify-center mt-5'>
                    <button type="submit" className='hover:bg-gray-500 p-2' >
                        Xác thực
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Passwordnew;
