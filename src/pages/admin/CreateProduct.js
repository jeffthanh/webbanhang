import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { categories } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    name: '',
    description: '',
    price: '',
    sl:'',
    percent: '',
    special: false,
    category: '',
    image: [],
  });

  const localStorageData = window.localStorage.getItem('persist:shop/user');
  const [imageUrls, setImageUrls] = useState([]); // Array to store URLs of selected images
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const handleImageChange = (e) => {
    const imageFiles = e.target.files;

    // Create an array of image files by spreading the previous images and the new ones
    setPayload((prevPayload) => ({
      ...prevPayload,
      image: [...prevPayload.image, ...imageFiles],
    }));

    // Map and create URLs for each selected image
    const newImageUrls = Array.from(imageFiles).map((imageFile) =>
      URL.createObjectURL(imageFile)
    );
    setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setPayload((prevPayload) => ({
        ...prevPayload,
        [name]: checked,
      }));
    } else {
      setPayload((prevPayload) => ({
        ...prevPayload,
        [name]: value,
      }));
    }
  };


  const addProduct = async (name, description, price, imageUrl,sl, special, percent, category, token) => {
    try {
      if (localStorageData) {
        const tokenWithQuotes = token;
        const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);

        const response = await axios.post('http://localhost:5000/product', {
          name: name,
          description: description,
          price: price,
          images: imageUrl,
          sl:sl,
          percent: percent,
          category: category,
          special: special,
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
          navigate("../manage-products");
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
  const uploadImagesToCloudinary = async (imageFiles, token) => {
    const cloudName = 'dqbeplqtc';
    const uploadPreset = 'curghrze';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const imageUrls = [];

    for (const imageFile of imageFiles) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', uploadPreset);

      try {
        const response = await axios.post(url, formData);

        if (response.status === 200) {
          const imageUrl = response.data.secure_url;
          imageUrls.push(imageUrl);
        }
      } catch (error) {
        console.error('Lỗi khi tải ảnh lên Cloudinary:', error);
      }
    }

    if (imageUrls.length > 0) {
      setImageUrls(imageUrls); // Assuming you want to store the image URLs in state
      if (localStorageData) {

        addProduct(payload.name, payload.description, payload.price, imageUrls,payload.sl, payload.special, payload.percent, payload.category, token)


      }
    }
  };

  const handleSubmit = async () => {
    const { token } = JSON.parse(localStorageData);
    setLoading(true); // Start loading when processing
    await uploadImagesToCloudinary(payload.image, token)
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
      <h1 className='text-3xl font-bold border-b mb-5'>Tạo Sản Phẩm</h1>

      <div className='mb-4'>
        <label className='block text-sm font-semibold'>Tên Sản Phẩm:</label>
        <input
          type='text'
          name='name'
          value={payload.name}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-md py-2 px-3'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-semibold'>Nội Dung:</label>
        <textarea
          name='description'
          value={payload.description}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-md py-2 px-3'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-semibold'>Giá:</label>
        <input
          type='text'
          name='price'
          value={payload.price}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-md py-2 px-3'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-semibold'>Số lượng:</label>
        <input
          type='text'
          name='sl'
          value={payload.sl}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-md py-2 px-3'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-semibold'>Giảm Giá:</label>
        <input
          type='text'
          name='percent'
          value={payload.percent}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-md py-2 px-3'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-semibold'>Đặc Biệt:</label>
        <div>
          <label className={payload.special === true ? 'highligh' : ''}>
            <input
              type='radio'
              name='special'
              value='true'
              checked={payload.special === true}
              onChange={handleChange}
            />
            True
          </label>
          <label className={payload.special === false ? 'highlight' : ''}>
            <input
              type='radio'
              name='special'
              value='false'
              checked={payload.special === false}
              onChange={handleChange}
            />
            False
          </label>
        </div>
      </div>
      {categories && categories.length > 0 && (
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>Danh Mục:</label>
          <select
            name='category'
            value={payload.category}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-md py-2 px-3'
          >
            <option value=''>Chọn một danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className='mb-4'>
        <label className='block text-sm font-semibold'>Hình Ảnh:</label>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className='w-full border border-gray-300 rounded-md py-2 px-3'
          multiple // Allow multiple file selection
        />
      </div>
      {imageUrls.length > 0 && (
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>Hình Ảnh Đã Chọn:</label>
          <div className='grid grid-cols-8 gap-4'>
            {imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Image ${index}`}
                className='mb-2'
                style={{ width: '80px' }}
              />
            ))}
          </div>
        </div>
      )}
      <div className='flex justify-center  '>
        <button className='w-[90px] p-2  hover:bg-slate-300' onClick={handleSubmit} disabled={loading}>
          {loading ? <span>Loading...</span> : <span >Thêm</span>}
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
