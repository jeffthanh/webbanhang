import React, { useState, useEffect, memo } from 'react'
import { apiGetProducts } from '../../apis/product'
import { formathMoney } from '../../ultils/fn'
import icons from '../../ultils/icons'
import { Countdowm } from '../'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import path from 'ultils/path';
import { createSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { addToCart } from '../../store/cart/addToCart '; // Import action creator

const { FaShoppingCart } = icons
const Dealdaily = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false); // Declare expireTime
  let idInterval;
  const [dealdaily, setDealdaily] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({ limit: 1 });
    if (response) {
      setDealdaily(response[Math.round(Math.random() * 10)])
      const h=24 - new Date().getHours()
      const m = 60- new Date().getMinutes()
      const s = 60 - new Date().getSeconds()
      setHour(h);
      setMinute(m);
      setSecond(s);
    }else{
      setHour(0);
      setMinute(59);
      setSecond(59);
    }

  };


  const { current } = useSelector((state) => state.user);

  const handleClickOptions = async (e, flag) => {
    e.stopPropagation();
    if (flag === 'CART') {
      if (!current) {
        return Swal.fire({
          title: 'Almost...',
          text: 'Please login first!',
          icon: 'info',
          cancelButtonText: 'Not now!',
          showCancelButton: true,
          confirmButtonText: 'Go login page',
        }).then(async (rs) => {
          if (rs.isConfirmed)
            navigate({
              pathname: `/${path.LOGIN}`,
              search: createSearchParams({
                redirect: location.pathname,
              }).toString(),
            });
        });
      }

      // Thêm sản phẩm vào giỏ hàng bằng cách gọi action creator
      const dl = dispatch(addToCart([dealdaily])); // Thêm sản phẩm mới vào giỏ hàng
      if(dl){
        Swal.fire({
          icon: 'success',
          title: 'Thêm sản phẩm thành công',
          showConfirmButton: false,
          timer: 1500, // Close the notification after 1.5 seconds
        });
      }
    }
  };
  useEffect(() => {
    clearInterval(idInterval)
    fetchDealDaily();

  }, [expireTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);
  return (
    <div className='border w-full flex-auto'>
      <div className='flex items-center justify-center'>
        <span className='font-bold text-[20px]'>
          DEAL DAILY
        </span>
      </div>
      <div className='w-full flex flex-col items-center px-4 pt-8 gap-2'>
        <img src={dealdaily?.images[0] || ''} alt='' className='h-[300px] w-[250px] rounded-lg  object-cover' />
        <span className='line-clamp-1'>{dealdaily?.name}</span>
        <span>
          {dealdaily?.price ? `${formathMoney(dealdaily.price)} VNĐ` : 'Price not available'}
        </span>
      </div>
      <div className='flex-col items-center justify-center px-4 mt-8'>
        <div className='flex mb-4 gap-2'>
          <Countdowm unit={'Hours'} number={hour} />
          <Countdowm unit={'Minutes'} number={minute} />
          <Countdowm unit={'Seconds'} number={second} />
        </div>
        <button type='button' className='w-full flex items-center justify-center gap-2 bg-main hover:bg-gray-800  py-2 hover:text-white '>
          <FaShoppingCart />
          <span onClick={(e) => handleClickOptions(e, "CART")}>Thêm giỏ hàng</span>
        </button>
      </div>
    </div>
  )
}

export default memo(Dealdaily)