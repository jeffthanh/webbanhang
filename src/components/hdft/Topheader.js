import React, { memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import path from 'ultils/path';
import { getCurrent } from 'store/user/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import icons from 'ultils/icons';
import { logout, clearMessage } from 'store/user/userslice';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { clearCart } from '../../store/cart/cartActions';

const { AiOutlineLogout } = icons;

const Topheader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const localStorageData = window.localStorage.getItem('persist:shop/user');
    let { isLoggedIn, current, mes } = useSelector((state) => state.user);


    const handleLogout = () => {
        dispatch(clearCart());
        dispatch(logout())
      
    };
    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrent());
        }, 300);

        return () => {
            clearTimeout(setTimeoutId);
        };
    }, [dispatch, isLoggedIn]);

    if (localStorageData && typeof localStorageData === 'string') {
        const parsedData = JSON.parse(localStorageData);
        const accessToken = parsedData.token;

        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decodedToken.exp && currentTime > decodedToken.exp) {
                    isLoggedIn = false;
                    // Show the alert when the token is expired
                    Swal.fire('Oops!', 'Vui lòng đăng nhập lại.', 'info').then(() => {
                        dispatch(logout());
                        dispatch(clearCart());
                        dispatch(clearMessage());
                        navigate(`/${path.LOGIN}`);
                    });
                } else {
                    // Token còn hiệu lực, thực hiện các hành động khác nếu cần
                    console.log('Token còn hiệu lực');
                }
            } catch (error) {
                // Handle token decoding error
                // console.error('Token decoding error:', error);
            }
        }
    }

    return (
        <div className='h-[38px] w-full bg-green-400 flex items-center justify-center'>
            <div className='w-main flex items-center justify-between text-xs text-white'>
                <span>
                    Khóm 2, phường hộ phòng thị xã giá rai Bạc liêu
                </span>
                {isLoggedIn && current ? (
                    <div className='flex gap-2 text-sm items-center'>
                        <span>welcome</span>
                        <span onClick={ handleLogout} className='hover:rounded-full cursor-pointer hover:bg-gray-200 p-2 '>
                            <AiOutlineLogout size={18} />
                        </span>
                    </div>
                ) : (
                    <Link className='hover:text-gray-800' to={`/${path.LOGIN}`}>
                        Đăng nhập or đăng ký
                    </Link>
                )}
            </div>
        </div>
    );
};

export default memo(Topheader);
