import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const Editinfo = () => {
    const localStorageData = window.localStorage.getItem('persist:shop/user');
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = location.state || {};


    const [editeduserData, setEditeduserData] = useState({
        fullname: userData?.fullname || '',
        phone: userData?.phone || '',
        address: userData?.address || '',

        image: userData?.image || null, // Hình ảnh
    });


    const [imageUrl, setImageUrl] = useState(userData?.image || null); // URL hình ảnh
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setEditeduserData({ ...editeduserData, image: imageFile });

        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            setImageUrl(imageUrl);
        }
    };

    const uploadImageToCloudinary = async (imageFile) => {
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
                    handleUpdateuserData(imageUrl)

                }

            }
        }

        catch (error) {
            console.error('Lỗi khi tải ảnh lên Cloudinary:', error);
        }
    };

    const handleUpdateuserData = async (imageUrl) => {
        try {

            setLoading(true);
            const localStorageData = window.localStorage.getItem('persist:shop/user');
            const { token } = JSON.parse(localStorageData);

            const tokenWithQuotes = token;
            const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
            const response = await axios.put(`http://localhost:5000/user/`, {
                fullname: editeduserData.fullname,
                phone: editeduserData.phone,
                address: editeduserData.address,
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
                navigate("../personal");
                window.location.reload();
            } else {
                console.error('Cập nhật danh mục thất bại.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật danh mục:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleEdituserData = async () => {
        if (!editeduserData.fullname) {
            Swal.fire({
                title: 'Lỗi',
                icon: 'error',
                text: 'Vui lòng nhập họ tên.',
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

        setLoading(true); // Start loading when processing

        await uploadImageToCloudinary(editeduserData.image)
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
            {userData ? (
                <div className='w-1/2 mx-auto mt-5'>
                    <h1 className='h-75px flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b'>
                        <span>Chỉnh Sửa Thông Tin</span>
                    </h1>
                    <div className='flex flex-col'>
                        <h2 className='font-semibold mt-7'>
                            Họ và tên:
                        </h2>
                        <input
                            type='text'
                            value={editeduserData.fullname}
                            onChange={(e) => setEditeduserData({ ...editeduserData, fullname: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='font-semibold mt-7'>
                            Số điện thoại:
                        </h2>
                        <input
                            type='text'
                            value={editeduserData.phone}
                            onChange={(e) => setEditeduserData({ ...editeduserData, phone: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='font-semibold mt-7'>
                            Địa chỉ:
                        </h2>
                        <textarea
                            type='text'
                            value={editeduserData.address}
                            onChange={(e) => setEditeduserData({ ...editeduserData, address: e.target.value })}
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
                        <button className='w-[90px] p-2  hover-bg-slate-300' onClick={handleEdituserData} disabled={loading}>
                            {loading ? <span>Loading...</span> : <span>Lưu</span>}
                        </button>
                    </div>
                </div>
            ) : (
                <p>userData not found.</p>
            )}
        </div>
    )
}

export default Editinfo