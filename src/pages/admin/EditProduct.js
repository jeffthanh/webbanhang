import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditProduct = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const localStorageData = window.localStorage.getItem('persist:shop/user');
    const navigate = useNavigate();
    const { categories } = useSelector((state) => state.app);
    const [productImages, setProductImages] = useState(product.images || []);


    const [editedProduct, setEditedProduct] = useState({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        sl: product.sl || 0,
        percent: product.percent || 0,
        special: product.special || false,
        category: product.category || '', // Set the initial value to the current category
        images: product.images || [], // Hình ảnh

    });


    const handleImageChange = (e) => {
        const imageFiles = e.target.files;

        // Create an array of object URLs for the selected image files
        const imageUrls = Array.from(imageFiles).map((imageFile) => URL.createObjectURL(imageFile));

        // Update the productImages state with the selected image URLs
        setProductImages(imageUrls);

        // Update the editedProduct state with the selected image files
        setEditedProduct({ ...editedProduct, images: imageFiles });
    };

    // Hàm trả về tên danh mục dựa trên ID
    function getCategoryNameById(categories, categoryId) {
        try {
            const category = categories.find((category) => category._id === categoryId);
            return category ? category.name : 'Danh mục không tồn tại';
        } catch (error) {
            return 'Danh mục không tồn tại';
        }
    }
    const categoryName = getCategoryNameById(categories, editedProduct.category);

    const [loading, setLoading] = useState(false);


    const editProduct = async (name, description, price, imageUrl,sl, special, percent, category, token) => {
        try {
            if (localStorageData) {

                const tokenWithQuotes = token;
                const tokenWithoutQuotes = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);

                const response = await axios.put(`http://localhost:5000/product/${product._id}`, {
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
                if (response.status === 200) {
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
            setProductImages(imageUrls); // Assuming you want to store the image URLs in state
            if (localStorageData) {
                editProduct(editedProduct.name, editedProduct.description, editedProduct.price, imageUrls,editedProduct.sl, editedProduct.special, editedProduct.percent, editedProduct.category, token)


            }
        }
    };

    const handleSubmit = async () => {
        const { token } = JSON.parse(localStorageData);
        setLoading(true); // Start loading when processing
        await uploadImagesToCloudinary(editedProduct.images, token)
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
            {product ? (
                <div className='w-1/2 mx-auto mt-5'>
                    <h1 className="h-75px flex justify-center mt-5 items-center text-3xl font-bold px-4 border-b">
                        <span>Chỉnh Sửa Sản Phẩm</span>
                    </h1>
                    <div className="flex flex-col">
                        <h2 className="font-semibold mt-7">Tên Sản Phẩm:</h2>
                        <input
                            type="text"
                            value={editedProduct.name}
                            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <h2 className="font-semibold mt-7">Mô tả:</h2>
                        <textarea
                            className='w-full border border-gray-300 rounded-md py-2 px-3'
                            value={editedProduct.description}
                            onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <h2 className="font-semibold mt-7">Giá Sản Phẩm:</h2>
                        <input
                            type="number"
                            value={editedProduct.price}
                            onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}

                        />
                    </div>
                    <div>
                        <h2 className="font-semibold mt-7">Số lượng:</h2>
                        <input
                            type="number"
                            value={editedProduct.sl}
                            onChange={(e) => setEditedProduct({ ...editedProduct, sl: e.target.value })}

                        />
                    </div>
                    <div>
                        <h2 className="font-semibold mt-7">Giảm Giá:</h2>
                        <input
                            type="number"
                            value={editedProduct.percent}
                            onChange={(e) => setEditedProduct({ ...editedProduct, percent: e.target.value })}
                        />
                    </div>

                    <div className='mb-4'>
                        <h2 className='font-semibold'>Đặc Biệt:</h2>
                        <div>
                            <label className={editedProduct.special === true ? 'highlight' : ''}>
                                <input
                                    type='radio'
                                    name='special'
                                    value='true'
                                    checked={editedProduct.special === true}
                                    onChange={() => setEditedProduct({ ...editedProduct, special: true })}
                                />
                                True
                            </label>
                            <label className={editedProduct.special === false ? 'highlight' : ''}>
                                <input
                                    type='radio'
                                    name='special'
                                    value='false'
                                    checked={editedProduct.special === false}
                                    onChange={() => setEditedProduct({ ...editedProduct, special: false })}
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
                                value={editedProduct.category} // Set the selected category
                                onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })} // Update the selected category
                                className='w-full border border-gray-300 rounded-md py-2 px-3'
                            >
                                <option value=''>{categoryName}</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category.name}>
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
                            multiple
                        />
                    </div>
                    {productImages.length > 0 && (
                        <div className='mb-4'>
                            <label className='block text-sm font-semibold'>Hình Ảnh Đã Chọn:</label>
                            <div className='grid grid-cols-8 gap-4'>
                                {productImages.map((imageFile, index) => (
                                    <img
                                        key={index}
                                        src={imageFile}
                                        alt={`Image ${index}`}
                                        className='mb-2'
                                        style={{ width: '200px' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex justify-center">
                        <button
                            className="w-[90px] p-2 hover-bg-slate-300"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? <span>Loading...</span> : <span className='hover:bg-gray-500 p-2 w-[150px]'>Lưu</span>}
                        </button>
                    </div>
                </div>
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    );
};

export default EditProduct;
