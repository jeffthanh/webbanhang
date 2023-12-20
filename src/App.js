import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Login, Payment,Home, Public, Blogs, Detaiproduct, FAQ, Products, Services, CartPage } from 'pages/public'
import { AdminLayout, CreateCategory, CreateProduct, EditCategory, EditProduct, ManageCategory, ManageOrder, ManageProduct, EditOrder } from 'pages/admin';
import { Chagepassword, MenmberLayout,Getorder,Passwordnew ,Order,Editinfo ,Personal } from 'pages/member';
import { Chatbot } from 'components';
import path from 'ultils/path';
import { getCategories } from 'store/app/asyncAction'
import { useDispatch } from 'react-redux'
import Dashboard from 'pages/admin/Dashboard';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  return (
    <div className="min-h-srceen  font-main">

      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<Detaiproduct />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.CART} element={<CartPage />} />
          <Route path={path.PAYMENT} element={< Payment />} />

          <Route path={path.ALL} element={<Home />} />
        </Route>

        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.CREATE_PRODUCTS} element={<CreateProduct />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
          <Route path={path.EDIT_CATEGORY} element={<EditCategory />} />
          <Route path={path.EDIT_PRODUCT} element={< EditProduct />} />
          <Route path={path.EDIT_ORDER} element={< EditOrder />} />

          <Route path={path.CREATE_CATEGORY} element={<CreateCategory />} />
          <Route path={path.MANAGE_CATEGORY} element={<ManageCategory />} />
          <Route path={path.MANAGE_ORDERS} element={<ManageOrder />} />


        </Route>
        <Route path={path.MEMBER} element={<MenmberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.EDITINFO} element={<Editinfo />} />

          <Route path={path.CHAGEPASSWORD} element={<Chagepassword />} />
          <Route path={path.ORDER} element={<Order />} />
          <Route path={path.GET_ORDER} element={< Getorder/>} />
          <Route path={path.PASSWORDNEW} element={<Passwordnew />} />

        </Route>

        <Route path={path.LOGIN} element={<Login />} />


      </Routes>
      <Chatbot/>
    </div>
  );
}

export default App;
