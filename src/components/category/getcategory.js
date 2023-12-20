import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const GetCategory = () => {
    const { categories } = useSelector(state => state.app);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false); // Trạng thái loading

    const handlerEditCategory = (categoryId) => {
        // Lấy danh mục cần chỉnh sửa từ danh sách categories
        const categoryToEdit = categories.find((el) => el._id === categoryId);
    
        if (categoryToEdit) {
            navigate(`../edit-category/${categoryId}`, {
                state: { category: categoryToEdit }
            });
        }
    };

    const handleDeleteCategory = (categoryId) => {
        console.log(categoryId)
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            setLoading(true);
            const localStorageData = window.localStorage.getItem('persist:shop/user');
            const { token } = JSON.parse(localStorageData);
            const tokenWithQuotes = token;
            const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
            // Gọi API để xóa danh mục
            axios.delete(`http://localhost:5000/category/${categoryId}`, {
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
    return (
        <div className="flex flex-col items-center h-full py-4">
            <table className="border-collapse border border-gray-300 mb-4">
                <thead>
                    <tr className="bg-main text-white">
                        <th className="px-8 py-4 text-center border-l-2 border">Tên</th>
                        <th className="px-8 py-4 text-center border-l-2 border">Hình ảnh</th>
                        <th className="px-8 py-4 text-center border-l-2 border">Chỉnh sửa</th>
                        <th className="px-8 py-4 text-center">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map((el) => (
                        <tr key={el._id}>
                            <td className="px-8 py-4 text-lg text-center border-l-2 border">
                                {el.name}
                            </td>
                            <td className="px-8 py-4 text-lg text-center border-l-2 border">
                                <img src={el.image} width={"100px"} alt={el.name} />
                            </td>
                            <td className="px-8 py-4 text-lg text-center border-l-2 border">
                                <button onClick={() => handlerEditCategory(el._id)} className='w-[90px] p-2  hover:bg-slate-300' disabled={loading}>
                                    {loading ? <span>Loading...</span> : <span>Sửa</span>}
                                </button>
                            </td>
                            <td className="px-8 py-4 text-lg text-center border-l-2 border">
                                <button onClick={() => handleDeleteCategory(el._id)} className='w-[90px] p-2  hover:bg-slate-300' disabled={loading}>
                                    {loading ? <span>Loading...</span> : <span>Xóa</span>}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetCategory;
