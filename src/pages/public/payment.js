import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Payment = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const localStorageData = window.localStorage.getItem('persist:shop/user');
  const { token } = JSON.parse(localStorageData);
  const userData = JSON.parse(localStorageData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Access the 'current' property
  const currentData = userData && userData.current;
  const user = JSON.parse(currentData);

  const fetchData = async (cartItems, user, selectedPaymentMethod) => {
    try {
      const localStorageData = window.localStorage.getItem('persist:shop/user');
      const { token } = JSON.parse(localStorageData);
      const jsonData = {
        products: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images[0],
        })),
        customer: {
          address: user['address'],
          fullname: user['fullname'],
          phone: user['phone'],
          _id: user['_id'],
        },
      };

      const { products, customer } = jsonData;

      if (localStorageData) {
        const tokenWithQuotes = token;
        const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
        const response = await axios.post(
          'http://localhost:5000/order',
          {
            products,
            customer,
            selectedPaymentMethod,
          },
          {
            headers: {
              authorization: `Bearer ${tokenWithoutQuotes}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 201) {
          console.log('Đơn hàng đã được thêm thành công.');
          Swal.fire({
            title: 'Thành công',
            icon: 'success',
            text: 'Đơn hàng đã được thêm thành công.',
          });
          navigate("../");
         
        }
      }
    } catch (error) {
      console.error('Lỗi khi thêm đơn hàng:', error);
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Đã xảy ra lỗi khi thêm đơn hàng.',
      });
    } finally {
      setLoading(false); // Dừng loading khi hoàn thành xử lý
    }
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    return totalPrice.toLocaleString('en-US');
  };

  const handlePaymentClick = () => {
    if (!selectedPaymentMethod) {
      // Nếu không có phương thức thanh toán được chọn, hiển thị thông báo hoặc thực hiện hành động phù hợp
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Vui lòng chọn phương thức thanh toán.',
      });
    } else {
      // Nếu có phương thức thanh toán được chọn, thực hiện thanh toán
      fetchData(cartItems, user, selectedPaymentMethod);
    }
  };

  return (
    <div className='w-main flex flex-col'>
      <div className='flex items-center justify-center mt-4'>
        <h2 className='font-semibold text-3xl text-yellow-500'>Thông Tin Đơn Hàng</h2>
      </div>

      <div className='mt-8 flex'>
        <div className='flex flex-col flex-2 '>
          <div>
            <div className='font-semibold text-[18px]'>Địa chỉ người nhận</div>
            <div className='h-[20px]'></div>
            <div>
              {user.length === 0 ? (
                <div className='flex items-center justify-center'>
                  <div className='h-20'></div>
                  <p className='font-semibold text-2xl'>Thông tin chưa có</p>
                </div>
              ) : (
                <div>
                  <div className='mb-6 flex items-center'>
                    <span>Họ tên:</span>
                    <div className='w-[40px]'></div>
                    <span className='p-2 text-center w-[300px] rounded-md border bg-slate-200'>{user.fullname}</span>
                  </div>
                  <div className='mb-6 flex items-center'>
                    <span>Địa chỉ:</span>
                    <div className='w-[40px]'></div>
                    <span className='p-2 text-center w-[300px] rounded-md border bg-slate-200'>{user.address}</span>
                  </div>
                  <div className='mt-4 flex items-center'>
                    <span>Số điện thoại:</span>
                    <span className='p-2 text-center w-[300px] rounded-md border bg-slate-200'>{user.phone}</span>
                  </div>
                </div>
              )}
            </div>
            <div className='h-[50px]'></div>
            <div>
              <div className='font-semibold text-[18px]'>Phương thức thanh toán</div>
              <select
                value={selectedPaymentMethod}
                onChange={handlePaymentMethodChange}
                className='mt-2 p-2 border border-gray-300 rounded-md'
              >
                <option value=''>Chọn phương thức thanh toán</option>
                <option value='thanh toán khi nhận hàng'>Thanh toán tiền mặt</option>
              </select>

              {selectedPaymentMethod && (
                <div className='mt-4'>
                  <p>Phương thức thanh toán đã chọn: {selectedPaymentMethod}</p>
                </div>
              )}
            </div>
            <div className='h-[500px]'></div>
          </div>
        </div>
        <div className='flex flex-col flex-3 '>
          {cartItems.length === 0 ? (
            <div className='flex items-center justify-center'>
              <div className='h-20'></div>
              <p className='font-semibold text-2xl'>Chưa có sản phẩm</p>
            </div>
          ) : (
            <div>
              <table className='mt-6 w-full'>
                <thead>
                  <tr className='text-lg'>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Hình ảnh</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className='border-b pb-2'>
                      <td className='text-center'>
                        <p className='text-[15px]'>{item.name}</p>
                      </td>
                      <td className='text-center'>{item.price} VNĐ</td>
                      <td className='text-center'>
                        <span className='mx-2'>{item.quantity}</span>
                      </td>
                      <td className='flex items-center justify-center'>
                        <img src={item.images[0]} width={'30px'} alt={item.name} className='mr-4' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='mt-4 text-right'>
                <p className='text-xl font-semibold'>Tổng giá tiền: {calculateTotalPrice()} VNĐ</p>
                <div className='h-[30px]'></div>
                <button
                  className={`w-[200px] p-2 bg-gray-500 hover:bg-slate-200 cursor-pointer ${
                    !selectedPaymentMethod && 'opacity-50'
                  }`}
                  onClick={handlePaymentClick}
                  disabled={loading || !selectedPaymentMethod}
                >
                  {loading ? <span>Loading...</span> : <span>Thanh toán</span>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
