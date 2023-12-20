import React, { memo } from 'react'
import Slider from "react-slick";
import { Product } from '..'
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const Customslider = ({ products }) => {
    return (
        <>
            {products && <Slider className='custom-slider' {...settings}>
                {products?.map(el => (
                    <Product key={el.id} pid={el.id} productData={el} /> // Sử dụng el.name hoặc el.productId làm key
                ))}
            </Slider>}
        </>

    )
}

export default memo(Customslider)