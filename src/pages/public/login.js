import React, { useState, useCallback } from "react";
import { InputField, Button } from 'components';
import { apiLogin, apiRegister } from "apis/user";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import path from "ultils/path";

import { login } from 'store/user/userslice';
import { useDispatch } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        username: ''
    });

    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            username: ''
        });
    }

    const fetchData = async (rs) => {
        try {
            if (rs) {
                const headers = {
                    Authorization: `Bearer ${rs}`,
                    'Content-Type': 'application/json',
                };

                const response = await fetch(`http://localhost:5000/user/`, {
                    method: 'GET',
                    headers,
                });

                if (response.ok) {
                    const data = await response.json();
                    return data;
                } else {
                    console.error('Error fetching user data:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const [isRegister, setIsRegister] = useState(false);

    const validateForm = () => {
        // Kiểm tra nếu có bất kỳ trường yêu cầu nào bị bỏ trống
        if (!payload.email || !payload.password || (isRegister && !payload.username)) {
            Swal.fire({
                title: 'Thất bại',
                icon: 'error',
                text: 'Email, password, and username (if registering) are required fields.'
            });
            return false; // Form is invalid
        }
        return true; // Form is valid
    }

    const handleSubmit = useCallback(async () => {
        const { username, ...data } = payload;

        if (validateForm()) {
            if (isRegister) {
                // Registration logic
                try {
                    const response = await apiRegister(payload);
                    console.log(response);
            
                    // Check the status code
                    if (response.status === 400 ) {
                        Swal.fire({
                            title: 'Thất bại',
                            icon: 'error',
                            text: 'Email đã được sử dụng. Vui lòng chọn email khác.'
                        });
                    } else {
                        // Handle other status codes or successful registration
                        Swal.fire({
                            title: response ? 'Thành công' : 'Thất bại',
                            icon: response ? 'success' : 'error',
                        }).then(() => {
                            setIsRegister(false);
                            resetPayload();
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Thất bại',
                        icon: 'error',
                        text: 'Có lỗi xảy ra khi đăng kí.'
                    });
                }
            }else {
                // Login logic
                try {
                    const rs = await apiLogin(data);

                    if (rs.status) {
                        Swal.fire({
                            title: 'Thất bại',
                            icon: 'error',
                            text: 'Sai email hoặc mật khẩu.'
                        });
                    } else {
                        const dl = dispatch(login({ isLoggedIn: true, token: rs }));
                        if (dl) {
                            const current = await fetchData(rs);
                            const roleValue = current.role;
                            if (roleValue === 'user') {
                                dispatch(login({ isLoggedIn: true, token: rs }));
                                navigate(`${path.PUBLIC}`);
                            } else {
                                dispatch(login({ isLoggedIn: true, token: rs }));
                                navigate(`/${path.ADMIN}/${path.DASHBOARD}`);
                            }
                        } else {
                            console.error('Login action was not dispatched successfully.');
                            // Thực hiện các hành động khác nếu cần thiết khi xảy ra lỗi
                        }
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Thất bại',
                        icon: 'error',
                        text: 'Có lỗi xảy ra khi đăng nhập.'
                    });
                }
            }
        }
    }, [payload, isRegister]);

    return (
        <div className="w-screen h-screen">
            <img className="w-full h-full object-cover" src="https://scr.vn/wp-content/uploads/2020/07/Background-powerpoint-HD.jpg" />
            <div className="absolute bottom-1/3 items-center justify-center flex  left-1/4">
                <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center ">
                    <h1 className="text-[28px] text-main font-semibold mb-8"> {isRegister ? 'Register' : 'Login'}
                    </h1>
                    {isRegister && (
                        <>
                            <InputField
                                value={payload.username}
                                setValue={setPayload}
                                nameKey='username'
                            />
                            {!payload.username && <span className="text-red-500">Username is required.</span>}
                        </>
                    )}
                    <InputField
                        value={payload.email}
                        setValue={setPayload}
                        nameKey='email'
                    />
                    {!payload.email && <span className="text-red-500">Email is required.</span>}
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey='password'
                        type={'password'}
                    />
                    {!payload.password && <span className="text-red-500">Password is required.</span>}
                    <Button children={isRegister ? 'Register' : 'Login'} handleOnclick={handleSubmit} fw />
                    <div className="flex items-center justify-between w-full text-sm m-2">
                        {!isRegister && <span className="text-blue-500 hover:underline cursor-pointer">Forgot your account?</span>}
                        {!isRegister && <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => { setIsRegister(true) }}>Create an account</span>}
                        {isRegister && <span className="text-blue-500 w-full text-center hover:underline cursor-pointer" onClick={() => { setIsRegister(false) }}>Go login</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
