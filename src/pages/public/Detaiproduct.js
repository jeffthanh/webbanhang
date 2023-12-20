import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify';
import { Button, SelecQuatity, ProductExtrainfo } from 'components';
import { formathMoney, fotmatPrice } from 'ultils/fn';
import { ProductExtrainfomation } from 'ultils/contants';
import Customslider from 'components/slider/customslider';
import { apiGetProductid, apiGetProducts } from 'apis'
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import path from 'ultils/path';
import { addToCart } from '../../store/cart/addToCart '; // Import action creator
import { useLocation } from 'react-router-dom';
import { createSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

const Detaiproduct = () => {

  const [quantity, setQuantity] = useState(1);
  const { pid, name, category } = useParams();
  const [relateProducts, setRelateProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0); // New state to track the selected image index
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchProductData = async () => {
    const response = await apiGetProductid(pid);
    if (response) setProduct(response);
  };

  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response) setRelateProducts(response);
  };
  const { current } = useSelector((state) => state.user);

  const handleClickOptions = async (e, flag, quantity) => {
    if (e) {
      e.stopPropagation();
    }
  
    if (flag === 'CART') {
      if (!current) {
        return Swal.fire({
          title: 'Almost...',
          text: 'Please login first!',
          icon: 'info',
          cancelButtonText: 'Not now!',
          showCancelButton: true,
          confirmButtonText: 'Go login page',
        }).then(async (rs) => {
          if (rs.isConfirmed)
            navigate({
              pathname: `/${path.LOGIN}`,
              search: createSearchParams({
                redirect: location.pathname,
              }).toString(),
            });
        });
      }
  
      if (quantity) {
        const dl = dispatch(addToCart([{ ...product, quantity }]));
        
        if (dl) {
          Swal.fire({
            icon: 'success',
            title: 'Thêm sản phẩm thành công',
            showConfirmButton: false,
            timer: 1500, // Close the notification after 1.5 seconds
          });
        }
      }
    }
  };
  



  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
  }, [pid]);

  const handleQuantity = useCallback((number) => {
    if (!Number(number) || Number(number) < 1) {
      return;
    } else {
      setQuantity((prev) => {
        // Sử dụng giá trị mới nhất của prev để cập nhật quantity
        return Number(number);
      });
    }
  }, []);

  const handleChangeQuantity = useCallback((flag) => {
    if (flag === 'minus' && quantity === 1) return;
    if (flag === 'minus') {
      setQuantity((prev) => prev - 1);
    }
    if (flag === 'plus') {
      setQuantity((prev) => prev + 1);
    }
  }, [quantity]);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  return (

    <div className='w-full'>
      <div className='h-[81px] flex justify-center items-center bg-gray-100'>
        <div className='w-main '>
          <h3 className='font-semibold '>{name}</h3>
        </div>

      </div>
      <div className='w-main m-auto mt-4 flex'>
        <div className='flex flex-col gap-4 w-2/5'>
          <div className='h-[460px] w-[450px]'>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: product?.images?.[selectedImage] || ''
                },
                largeImage: {
                  src: product?.images?.[selectedImage] || '',
                  width: 1200,
                  height: 1200
                }
              }}
            />
          </div>
          <div className='w-[458px]'>
            <Slider className='image-slider' {...settings}>
              {product?.images?.map((el, index) => (
                <div
                  key={index}
                  className='flex w-full'
                  onClick={() => handleImageClick(index)} // Handle image click event
                >
                  <img src={el} className='h-[140px] border object-cover w-[140px]' />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className=' w-2/5 '>
          <div className='flex justify-between'>
            <h2 className='text-[30px] font-semibold '>{`Giá ${formathMoney(fotmatPrice(product?.price))} VNĐ`}</h2>
            <h3 className='text-[20px] font-semibold text-main mt-2' >{`Giảm ${product?.percent}%`}</h3>
          </div>
          <h3 className='text-[20px] font-semibold text-green-700 mt-2' >Thông tin</h3>
          <ul className='list-item mt-4'>
            {product?.description}
          </ul>
          <div className='flex-col flex gap-8'>
            <div className='flex mt-4'>
              <span className='text-[20px] font-semibold p-1 text-blue-400'>Số lượng:</span>

              <SelecQuatity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity} />
            </div>
            <Button handleOnclick={(e) => handleClickOptions(e, "CART", quantity)} fw> Add to Cart </Button>
          </div>

        </div>
        <div className=' w-1/5'>
          {ProductExtrainfomation.map(el => (
            <ProductExtrainfo key={el.id} icon={el.icon} title={el.title} sub={el.sub} />
          ))}
        </div>

      </div>
      <div className='w-main m-auto mt-8'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>Sản Phẩm Khác</h3>
        <Customslider products={relateProducts} />
      </div>

    </div>
  )
}

export default Detaiproduct