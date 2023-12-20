import React from "react";
import icons from 'ultils/icons'
import { Link } from 'react-router-dom'
import path from 'ultils/path'
import { useSelector } from 'react-redux'
const { RiPhoneFill, AiFillMail, FaShoppingBag, BiSolidUserCircle } = icons

const Header = () => {
    const {current} = useSelector(state => state.user)
    return (
        <div className=" w-main flex justify-between h-[110px] py-[35px] items-center">
            <Link to={`/${path.HOME}`}>
                <img className="object-contain w-auto h-[80px]" src="https://res.cloudinary.com/dqbeplqtc/image/upload/v1696129643/thanhjs/logo_bqqqxl.jpg" />
            </Link>

            <div className="flex text-[13px] ">
                <div className="flex flex-col items-center px-6 border">
                    <span className="flex gap-4 items-center">
                        <RiPhoneFill color="red" size={20} />
                        <span className="font-semibold">(+84)0839037544</span>
                    </span>
                    <span>
                        Monday-Sunday 7:00AM - 20:00PM
                    </span>
                </div>
                <div className="flex flex-col items-center px-6 border">
                    <span className="flex gap-4 items-center">
                        <AiFillMail color="red" size={20} />
                        <span className="font-semibold">Jefthanh@gmail.com</span>
                    </span>
                    <span>
                        Online Support 24/7
                    </span>
                </div>

                {current ? (
                    // Hiển thị giỏ hàng khi đã đăng nhập
                    <div className="flex gap-2 items-center px-6 border cursor-pointer">
                        <FaShoppingBag color="red" size={20} />
                        <Link to={path.CART}>Giỏ Hàng</Link>
                    </div>
                ) : null}
                <Link to={current?.role === 'admin'? `/${path.ADMIN}/${path.DASHBOARD}`:`/${path.MEMBER}/${path.PERSONAL}` } className="flex gap-2 items-center px-6 border  cursor-pointer ">
                    <BiSolidUserCircle color="red" size={20} />
                    <span>profile</span>
                </Link >

            </div>
        </div>
    )
}

export default Header
