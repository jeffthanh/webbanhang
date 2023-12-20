// Product.js
import React, { useState } from 'react';
import { formathMoney } from 'ultils/fn';
import { SelectOption } from '../';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { createSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import icons from 'ultils/icons';
import path from 'ultils/path';
import { addToCart } from '../../store/cart/addToCart '; // Import action creator
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const { AiFillEye, FaShoppingCart } = icons;

const Product = ({ productData }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const { current } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();



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
      const dl = dispatch(addToCart([productData])); // Thêm sản phẩm mới vào giỏ hàng
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




  return (
    <div
      className='w-full text-base  px-[10px]'

      onMouseEnter={(e) => {
        e.stopPropagation();
        setIsShowOption(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setIsShowOption(false);
      }}>
      <div className='w-full border p-[15px] flex flex-col items-center'>
        <div className='w-full relative'>
          {isShowOption && (
            <div className='absolute botom-0 left-0 right-0 flex justify-center gap-2 animate-slide-top'>
              <Link to={`/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.name}`}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setIsShowOption(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setIsShowOption(false);
                }}><SelectOption icon={<AiFillEye />} /></Link>


              <span
                title="Add to Cart"
                onClick={(e) => handleClickOptions(e, "CART")}
              >
                <SelectOption icon={<FaShoppingCart />} />
              </span>
            </div>
          )}
        </div>
        <div className='w-full p-[px] flex flex-col items-center'>
          <img src={productData?.images[0] || ''} alt='' className='h-[240px] w-[240px] object-cover' />
          <div className='flex flex-col gap-1 mt-[15px] w-full items-start'>
            <span className='line-clamp-1'>{productData?.name}</span>
            <span>{`${formathMoney(productData?.price)} VNĐ`}</span>
          </div>
        </div>
       
      </div>
      <div className='h-[25px]'></div>
    </div>
  );
};

export default Product;
