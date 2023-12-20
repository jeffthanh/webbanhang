import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const EditCategory = () => {
    const location = useLocation();
    const { category } = location.state || {};
    const localStorageData = window.localStorage.getItem('persist:shop/user');
    const navigate = useNavigate();

    const [editedCategory, setEditedCategory] = useState({
        category: category.name || '', // Tên danh mục
        image: category.image || null, // Hình ảnh
    });

    const [imageUrl, setImageUrl] = useState(category.image || null); // URL hình ảnh
    const [loading, setLoading] = useState(false); // Trạng thái loading

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setEditedCategory({ ...editedCategory, image: imageFile });

        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            setImageUrl(imageUrl);
        }
    };
    const uploadImageToCloudinary = async (imageFile, token) => {
        const cloudName = 'dqbeplqtc';
        const uploadPreset = 'curghrze';
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', uploadPreset);

        try {
            const response = await axios.post(url, formData);

            if (response.status === 200) {
                const imageUrl = response.data.secure_url;
                setImageUrl(imageUrl);
                if (localStorageData) {

                    handleUpdateCategory(imageUrl);

                }
            }
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên Cloudinary:', error);
        }
    };
    const handleUpdateCategory = async (imageUrl) => {
        try {

            setLoading(true);
            const localStorageData = window.localStorage.getItem('persist:shop/user');
            const { token } = JSON.parse(localStorageData);

            const tokenWithQuotes = token;
            const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
            const response = await axios.put(`http://localhost:5000/category/${category._id}`, {
                name: editedCategory.category,
                image: imageUrl,
                // Các trường thông tin khác cần cập nhật
            }, {
                headers: {
                    'authorization': `Bearer ${tokenWithoutQuotes}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log('Danh mục đã được cập nhật thành công.');
                navigate("../manage-category");
                window.location.reload();

                // window.location.reload();
            } else {
                console.error('Cập nhật danh mục thất bại.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật danh mục:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleEditCategory = async () => {
        if (!editedCategory.category) {
            Swal.fire({
                title: 'Lỗi',
                icon: 'error',
                text: 'Vui lòng nhập tên danh mục.',
            });
            return; // Exit early if the category is not provided
        }

        if (!imageUrl) {
            Swal.fire({
                title: 'Lỗi',
                icon: 'error',
                text: 'Vui lòng chọn hình ảnh danh mục.',
            });
            return; // Exit early if no image is selected
        }

        const { token } = JSON.parse(localStorageData);
        setLoading(true); // Start loading when processing

        await uploadImageToCloudinary(editedCategory.image, token)
            .then(() => {
                // Xử lý khi tải ảnh thành công
                console.log('Tải ảnh lên thành công');
            })
            .catch((error) => {
                // Xử lý khi có lỗi xảy ra trong quá trình tải ảnh
                console.error('Lỗi khi tải ảnh:', error);
            });
    };

    return (
        <div>
            {category ? (
                <div className='w-1/2 mx-auto mt-5'>
                    <h1 className='h-75px flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b'>
                        <span>Chỉnh Sửa Danh Mục</span>
                    </h1>
                    <div className='flex flex-col'>
                        <h2 className='font-semibold mt-7'>
                            Tên Danh Mục:
                        </h2>
                        <input
                            type='text'
                            value={editedCategory.category}
                            onChange={(e) => setEditedCategory({ ...editedCategory, category: e.target.value })}
                        />
                    </div>

                    <div>
                        <h2 className='font-semibold mt-7'>
                            Hình ảnh:
                        </h2>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                        />
                        {imageUrl && (
                            <div className='mt-2'>
                                <img src={imageUrl} alt='Hình ảnh đã chọn' style={{ maxWidth: '200px' }} />
                            </div>
                        )}
                    </div>
                    <div className='flex justify-center  '>
                        <button className='w-[90px] p-2  hover-bg-slate-300' onClick={handleEditCategory} disabled={loading}>
                            {loading ? <span>Loading...</span> : <span className='hover:bg-gray-500 p-2 w-[150px]'>Lưu</span>}
                        </button>
                    </div>
                </div>
            ) : (
                <p>Category not found.</p>
            )}
        </div>
    );
};

export default EditCategory;
