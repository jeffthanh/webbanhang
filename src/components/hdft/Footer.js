import React, { memo } from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='h-[350px] w-auto bg-green-900 flex'>
      <div className=' flex  items-center justify-center'>
        <div className='w-[30%]' >
          <img src='https://muayensao.vn/wp-content/uploads/2022/11/logo-muayensao.png' />
        </div>
        <div className='w-[60%] flex flex-col'>
          <span className=' gap-5 m-5 text-yellow-200 font-main text-[20px]'>
            Mua Yến Sào hướng tới mục tiêu trở thành thương hiệu về yến sào hàng đầu Việt Nam, chúng tôi luôn nỗ lực không ngừng để đưa cửa hàng trở nên gần gũi hơn và là thương hiệu cung cấp những sản phẩm về yến sào chất lượng tốt nhất, thỏa mãn nhu cầu của quý khách hàng.
          </span>
          <Link
            className="hover:bg-green-400 hover:text-yellow-300 w-[250px] text-center text-yellow-500 m-5 text-[20px]  border-yellow-300 border p-5 rounded-full"
            to="https://www.facebook.com/profile.php?id=100050692964759"
          >
            Fanpage Facebook
          </Link>
        </div>





      </div>

    </div>
  )
}

export default memo(Footer)