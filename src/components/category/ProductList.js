import React, { useState, useEffect } from "react";
import { apiGetProducts } from "apis/product";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { formathMoney } from 'ultils/fn';

const ProductList = () => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const response = await apiGetProducts({});
        setProducts(response);

    }

    const handlerEditProduct = (productId) => {
        // Lấy danh mục cần chỉnh sửa từ danh sách categories
        const productToEdit = products.find((el) => el._id === productId);
    
        if (productToEdit) {
            navigate(`../edit-product/${productId}`, {
                state: { product: productToEdit }
            });
        }
    };


    
    const handleDeleteProduct = (productId) => {
        console.log(productId)
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            setLoading(true);
            const localStorageData = window.localStorage.getItem('persist:shop/user');
            const { token } = JSON.parse(localStorageData);
            const tokenWithQuotes = token;
            const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
            // Gọi API để xóa danh mục
            axios.delete(`http://localhost:5000/product/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${tokenWithoutQuotes}`,
                },
            })
                .then((response) => {
                    if (response.status === 200) {

                        window.location.reload();

                    } else {
                        // Xóa thất bại, hiển thị thông báo lỗi hoặc xử lý theo cách bạn muốn
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi xóa danh mục:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    useEffect(() => {
        fetchProducts();

    }, []);
    return (
        <div className="flex flex-col items-center h-full py-4">
            <table className="border-collapse border border-gray-300 mb-4">
                <thead>
                    <tr className="bg-main text-white">
                        <th className="px-8 py-4 text-center border-l-2 border">Tên</th>
                        <th className="px-8 py-4 text-center border-l-2 border">Hình ảnh</th>
                        <th className="px-8 py-4 text-center border-l-2 border">Giá</th>

                        <th className="px-8 py-4 text-center border-l-2 border">Chỉnh sửa</th>
                        <th className="px-8 py-4 text-center">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products?.map((el) => (
                        <tr key={el._id}>
                            <td className="px-8 py-4 text-lg text-center border-l-2 border">
                                {el.name}
                            </td>
                            <td className="px-8 py-4 text-lg text-center border-l-2 border">
                                <img src={el.images[0]} width={"100px"} alt={el.name} />
                            </td>
                            <td className="px-8 py-4 text-lg text-center border-l-2 border">
                                {`${formathMoney(el.price)} VNĐ`}
                            </td>
                            <td className="px-8 py-4 text-lg text-center border-l-2 border">
                                <button onClick={() => handlerEditProduct(el._id)} className='w-[90px] p-2  hover:bg-slate-300' disabled={loading}>
                                    {loading ? <span>Loading...</span> : <span>Sửa</span>}
                                </button>
                            </td>
                            <td className="px-8 py-4 text-lg text-center border-l-2 border">
                                <button    onClick={() => handleDeleteProduct(el._id)} className='w-[90px] p-2  hover:bg-slate-300' disabled={loading}>
                                    {loading ? <span>Loading...</span> : <span>Xóa</span>}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
