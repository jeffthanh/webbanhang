import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const CreateCategory = () => {
  const [payload, setPayload] = useState({
    category: '', // Tên danh mục
    image: null, // Hình ảnh
  });
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(null); // URL hình ảnh
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const localStorageData = window.localStorage.getItem('persist:shop/user');

  // Xử lý khi người dùng chọn hình ảnh
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setPayload({ ...payload, image: imageFile });

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageUrl(imageUrl);
    }
  };

  // Tải hình ảnh lên Cloudinary
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

          addCategoryToAPI(payload.category, imageUrl, token);


        }
      }
    } catch (error) {
      console.error('Lỗi khi tải ảnh lên Cloudinary:', error);
    }
  };

  // Gửi yêu cầu thêm danh mục lên API
  const addCategoryToAPI = async (category, imageUrl, token) => {
    try {
      if (localStorageData) {
        const tokenWithQuotes = token;
        const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
        const response = await axios.post('http://localhost:5000/category', {
          name: category,
          image: imageUrl,
        }, {
          headers: {
            'authorization': `Bearer ${tokenWithoutQuotes}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201) {
          console.log('Danh mục đã được thêm thành công.');
          Swal.fire({
            title: 'Thành công',
            icon: 'success',
            text: 'Danh mục đã được thêm thành công.',
          });
          navigate("../manage-category");
          window.location.reload();


        }


      }
    } catch (error) {
      console.error('Lỗi khi thêm danh mục:', error);
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Đã xảy ra lỗi khi thêm danh mục.',
      });
    } finally {
      setLoading(false); // Dừng loading khi hoàn thành xử lý
    }
  };

  const handleAddCategory = async () => {
    if (!payload.category) {
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

    await uploadImageToCloudinary(payload.image, token)
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
    <div className='w-1/2 mx-auto mt-5'>
      <h1 className='h-75px flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b'>
        <span>Tạo Danh Mục</span>
      </h1>

      <div className='flex flex-col'>
        <h2 className='font-semibold mt-7'>
          Tên Danh Mục:
        </h2>
        <input
          type='text'
          value={payload.category}
          onChange={(e) => setPayload({ ...payload, category: e.target.value })}
        />
      </div>

      <div className='flex flex-col'>
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
        <button className='w-[90px] p-2  hover:bg-slate-300' onClick={handleAddCategory} disabled={loading}>
          {loading ? <span>Loading...</span> : <span>Thêm</span>}
        </button>
      </div>
    </div>
  );
}

export default CreateCategory;
