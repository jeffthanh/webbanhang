import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const FAQ = () => {
  return (
    <div className='w-main mt-5'>
      <h1 className='h-75px flex justify-center mt-5 items-center text-3xl font-bold px-4'>
        <span className='text-green-600'>LIÊN HỆ</span>
      </h1>
      <div className='h-[50px]'></div>
      <h2 className='text-2xl font-bold mb-3'>THÔNG TIN LIÊN HỆ</h2>
      <div>
        <div className='flex'>
          <FaLocationDot />
          <div className='ml-3'>
            <span>
              Trụ sở: 197 Đường Duyên Hải, Khu Phố Miễu Nhì, Thị Trấn Cần Thạnh, Huyện Cần Giờ, Thành phố Hồ Chí Minh, Việt Nam
            </span>
          </div>
        </div>
        <div className='flex'>
          <FaPhoneAlt />
          <div className='ml-3'>
            <span>
              Hotline: 1900 86 68 37
            </span>
          </div>
        </div>
        <div className='flex'>
          <MdEmail />
          <div className='ml-3'>
            <span>
              Email: contact@yendaocangio.com
            </span>
          </div>
        </div>
        <div className='h-[50px]'></div>
        <div className='mt-4'>
          <h2 className='text-2xl font-bold mb-3'>HỆ THỐNG CHI NHÁNH</h2>
          <ul>
            <li>
              <strong>-</strong> Lầu 1 Tòa nhà VNJC, 473 Đường Nguyễn Thị Thập, Phường Tân Phong, Quận 7, Thành phố Hồ Chí Minh
            </li>
            <li>
              <strong>-</strong> 503 Hoàng Hoa Thám, Phường Vĩnh Phúc, Quận Ba Đình, Hà Nội
            </li>
            <li>
              <strong>-</strong> 802 Đường Duyên Hải, Ấp Hòa Hiệp, Xã Long Hòa, Huyện Cần Giờ, Thành phố Hồ Chí Minh
            </li>
            <li>
              <strong>-</strong> 154 Đường Duyên Hải, Khu phố Miễu Nhì, Thị trấn Cần Thạnh, Huyện Cần Giờ, Thành phố Hồ Chí Minh
            </li>
            <li>
              <strong>-</strong> 482 Ngô Gia Tự, Phường Tiền An, Thành phố Bắc Ninh, Tỉnh Bắc Ninh
            </li>
          </ul>
        </div>
      </div>
      <div className='h-[200px]'></div>
    </div>
  );
}

export default FAQ;
