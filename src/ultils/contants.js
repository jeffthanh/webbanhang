import path from "./path"
import icons  from "./icons"
export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `/${path.HOME}`
    },
    {
        id:2,
        value: 'SERVICES',
        path: `/${path.OUR_SERVICES}`
    },
    {
        id:3,
        value: 'FAQ',
        path: `/${path.FAQ}`
    },
    {
        id: 4,
        value: 'BLOGS',
        path: `/${path.BLOGS}`
    },
]


const {RiTruckFill,BsShieldShaded,BsReplyFill,AiFillGift,IoMdHome,BiCategoryAlt , AiOutlineDashboard,TbBrandProducthunt ,RiBillLine} = icons
export const ProductExtrainfomation = [
    {
        id:1,
        title:'Guarantee',
        sub:'Quality Checked',
        icon:<BsShieldShaded/>
    },
    {
        id:2,
        title:'Free Shipping',
        sub:'Free On All Products',
        icon:<RiTruckFill/>
    },
    {
        id:1,
        title:'Special Gift Cards',
        sub:'Special Gift Cards',
        icon:<AiFillGift/>
    },
    {
        id:1,
        title:'Free Return',
        sub:'Within 7 Days',
        icon:<BsReplyFill/>
    },
]
export const sorts =[
    {
        id:1,
        value:'-name',
        text :'tên sản phẩm, A-Z'
    },
    {
        id:2,
        value:'name',
        text :'tên sản phẩm, Z-A'
    },
    {
        id:3,
        value:'-price',
        text:'Giá giảm dần'
    },
    {
        id:4,
        value:'price',
        text:'Giá tăng dần'
    }

]
export const adminSidebar = [
  {
    id: 1,
    type: 'SINGLE',
    text: 'Dashboard',
    path: `${path.DASHBOARD}`,
    icon: <AiOutlineDashboard />,
  },
  {
    id: 2,
    type: 'PARENT',
    text: 'Manage products',
    icon: <TbBrandProducthunt />,
    submenu: [
      {
        text: 'Create product',
        path: `${path.CREATE_PRODUCTS}`,
      },
      {
        text: 'Manage product',
        path: `${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 3,
    type: 'PARENT',
    text: 'Manage category',
    icon: <BiCategoryAlt />,
    submenu: [
      {
        text: 'Create category',
        path: `${path.CREATE_CATEGORY}`,
      },
      {
        text: 'Manage category',
        path: `${path.MANAGE_CATEGORY}`,
      },
    ],
  },
  {
    id: 4,
    type: 'SINGLE',
    text: 'Manage orders',
    path: `${path.MANAGE_ORDERS}`,
    icon: <RiBillLine />,
  },
  {
    id: 5,
    type: 'SINGLE',
    text: 'Home',
    path: `${path.PUBLIC}`,
    icon: <IoMdHome />,
  },

]

