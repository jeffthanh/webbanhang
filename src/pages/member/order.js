import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Chờ xử lý");
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const navigate = useNavigate();

  const localStorageData = window.localStorage.getItem('persist:shop/user');
  const parsedData = JSON.parse(localStorageData);
  const currentid = JSON.parse(parsedData.current);
  const id = currentid ? currentid._id : null;


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const localStorageData = window.localStorage.getItem('persist:shop/user');
        const { token } = JSON.parse(localStorageData);
        const tokenWithQuotes = token;
        const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);

        const response = await axios.get(`http://localhost:5000/order/${id}`, {
          headers: {
            'Authorization': `Bearer ${tokenWithoutQuotes}`,
          },
        });
        setOrders(response.data);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();

  }, []);

  const handlerGetOrder = (orderId) => {
    // Lấy danh mục cần chỉnh sửa từ danh sách categories
    const orderToget = orders.find((el) => el._id === orderId);

    if (orderToget) {
      navigate(`../get-order/${orderId}`, {
        state: { order: orderToget }
      });
    }
  };


  const filterOrders = (status) => {
    setSelectedStatus(status);
  };

  const filteredOrders = selectedStatus === "Chờ xử lý" ? orders.filter(order => order.status === selectedStatus) : orders.filter(order => order.status === selectedStatus);

  return (
    <div>
      <div className='w-1/2 mx-auto mt-5'>
        <h1 className='h-75px flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b'>
          <span>Đơn Hàng</span>
        </h1>
      </div>
      <div className="h-[45px]"></div>
      <div>
        <label htmlFor="orderStatus">Trạng Thái:</label>
        <select
          id="orderStatus"
          onChange={(e) => filterOrders(e.target.value)}
          value={selectedStatus}
        >
          <option value="Chờ xử lý">Chờ xử lý</option>
          <option value="Đang giao hàng">Đang giao hàng</option>
          <option value="Thành công">Thành công</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
      </div>
      <div className="flex flex-col items-center h-full py-4">
        <table className="border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-main text-white">
              <th className="px-8 py-4 text-center border-l-2 border">Id</th>
              <th className="px-8 py-4 text-center border-l-2 border">Hình ảnh</th>
              <th className="px-8 py-4 text-center border-l-2 border">Trạng thái</th>
              <th className="px-8 py-4 text-center border-l-2 border">Xem</th>

            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td className="px-8 py-4 text-lg text-center border-l-2 border">
                  {order._id}
                </td>
                <td className="px-8 py-4 text-lg text-center border-l-2 border">
                  <img src="https://res.cloudinary.com/dqbeplqtc/image/upload/v1697726914/thanhjs/pngtree-invioce-icon-design-vector-png-image_1588908_ow78nv.jpg" width={"80px"} />
                </td>
                <td className="px-8 py-4 text-lg text-center border-l-2 border">
                  {order.status}
                </td>
                <td className="px-8 py-4 text-lg text-center border-l-2 border">
                  <button onClick={() => handlerGetOrder(order._id)} className='w-[90px] p-2  hover:bg-slate-300' disabled={loading}>
                    {loading ? <span>Loading...</span> : <span>Chi tiết</span>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Order