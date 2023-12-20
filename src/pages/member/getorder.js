import React from 'react'
import { useLocation } from 'react-router-dom';

const Getorder = () => {
    const location = useLocation();
    const { order } = location.state || {};
    console.log(order)
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
                        <span>Đơn Hàng</span>
                    </h1>
                    <div className=' mt-8 border-b '>
                        <span className='font-semibold'>Danh sách sản phẩm:</span>
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
                                        <span>Giá:{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='mt-4'>
                            <span>Tổng số tiền: {calculateTotalAmount()} VND</span>
                        </div>
                    </div>
                    <div className=' mt-1 p-2 border-b'>
                        <span className='font-semibold'>Chọn trạng thái: </span>
                        <span>{order.status}</span>
                    </div>

                    <div className='mt-2'>
                        <span className='font-semibold'>Địa chỉ nhận hàng:</span>
                        <div className='text-[12px]'>
                            <p>Fullname: {order.customer.fullname}</p>
                            <p>Phone: {order.customer.phone}</p>
                            <p>Address: {order.customer.address}</p>
                        </div>
                    </div>


                </div>
            ) : (
                <p>Order not found.</p>
            )}
        </div>
    )
}

export default Getorder