import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { formathMoney } from 'ultils/fn';

const EditOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const navigate = useNavigate();

  const handleEditCategory = async () => {
    const localStorageData = window.localStorage.getItem('persist:shop/user');
    const { token } = JSON.parse(localStorageData);

    const tokenWithQuotes = token;
    const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
    const response = await axios.put(`http://localhost:5000/order/${order._id}`, {
      status: editedOrder.status,

    }, {
      headers: {
        'authorization': `Bearer ${tokenWithoutQuotes}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Danh mục đã được cập nhật thành công.');
      navigate("../manage-orders");
      window.location.reload();
    } else {
      console.error('Cập nhật danh mục thất bại.');
    }
  }


  console.log(order)
  const [editedOrder, setEditedOrder] = useState({
    status: order.status || '',
  });

  const calculateTotalAmount = () => {
    if (order) {
      return order.products.reduce((total, product) => {
        const productPrice = product.price;
        const productQuantity = product.quantity;
        const productTotal = productPrice * productQuantity;
        return total + productTotal;
      }, 0);
    }
    return 0; // Return 0 if there's no order or no products
  };
  return (
    <div>
      {order ? (
        <div className='w-1/2 mx-auto mt-5'>
          <h1 className='h-75px flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b'>
            <span>Cật Nhật Trạng Thái</span>
          </h1>
          <div className=' mt-8 border-b'>
            <span>Danh sách sản phẩm:</span>
            {order.products.map((product) => (
              <div key={product._id} className='flex h-[80px]'>
                <div className="w-25% p-2">
                  <img src={product.image} width={'60px'} />
                </div>
                <div className="w-75% p-2">
                  <div className='text-[12px]'>
                    {product.name}
                  </div>
                  <div className='p-2 flex w-[300px] text-[12px]'>
                    <span>Số lượng:{product.quantity}</span>
                    <div className='w-[50px]'></div>
                    <span>Giá:{`${formathMoney(product.price)}`}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className='mt-4'>
              <span>Tổng số tiền: {`${formathMoney(calculateTotalAmount())}`} VND</span>
            </div>
          </div>
          <div className=' mt-1 p-2 border-b'>
            <span>Chọn trạng thái:</span>
            <select
              value={editedOrder.status}
              onChange={(e) => setEditedOrder({ ...editedOrder, status: e.target.value })}
            >
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Đang giao hàng">Đang giao hàng</option>
              <option value="Thành công">Thành công</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
          <div className='mt-2'>
            <span>Địa chỉ nhận hàng:</span>
            <div className='text-[12px]'>
              <p>Fullname: {order.customer.fullname}</p>
              <p>Phone: {order.customer.phone}</p>
              <p>Address: {order.customer.address}</p>
            </div>
          </div>
          <div className='flex justify-center mt-5 '>
            <button className='w-[90px] p-2  hover-bg-slate-300 hover:bg-gray-500' onClick={handleEditCategory} disabled={loading}>
              {loading ? <span>Loading...</span> : <span>Lưu</span>}
            </button>
          </div>

        </div>
      ) : (
        <p>Order not found.</p>
      )}
    </div>
  )
}

export default EditOrder