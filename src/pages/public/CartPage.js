import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../../store/cart/quantity';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate(); // Use useNavigate
  const localStorageData = window.localStorage.getItem('persist:shop/user');
  const userData = JSON.parse(localStorageData);

  // Access the 'current' property
  const currentData = userData && userData.current;
  const user = JSON.parse(currentData);


  useEffect(() => {
    console.log('Cart Items:', cartItems);
  }, [cartItems]);

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    return totalPrice.toLocaleString('en-US');
  };


  return (
    <div className='w-main flex flex-col'>
      <div className='flex items-center justify-center mt-4'>
        <h2 className='font-semibold text-3xl text-yellow-500'>Giỏ Hàng</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className='flex items-center justify-center'>
          <div className='h-20'></div>
          <p className='font-semibold text-2xl'>Chưa có sản phẩm</p>
        </div>
      ) : (
        <div>
          <div
            className='mt-6 hover:bg-green-400 cursor-pointer w-48 h-12 bg-green-700 rounded-md flex items-center justify-center text-white'
            onClick={() => {
              if (user.fullname || user.address) {
                navigate('/payment');
              }
              else{
                navigate('/member/personal');
             

              }
            }}
          >
            <span>Tiến hành thanh toán</span>
          </div>
          <ul className='mt-6'>
            {cartItems.map((item) => (
              <li key={item._id} className='flex items-center border-b pb-2'>
                <img src={item.images[0]} width={'80px'} alt={item.name} className='mr-4' />
                <div className='flex items-center justify-between w-full'>
                  <div>
                    <p className='text-lg font-semibold'>{item.name}</p>
                    <p>{item.price} VNĐ</p>
                  </div>
                  <div className='flex items-center'>
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className='bg-gray-200 px-3 py-1 rounded-md'
                    >
                      -
                    </button>
                    <p className='mx-2'>{item.quantity}</p>
                    <button
                      onClick={() => handleIncrease(item._id)}
                      className='bg-gray-200 px-3 py-1 rounded-md'
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className='mt-4'>
            <p className='text-xl font-semibold'>Tổng giá tiền: {calculateTotalPrice()} VNĐ</p>
          </div>

        </div>
      )}
      <div className='h-[400px]'></div>
    </div>
  );
};

export default CartPage;
