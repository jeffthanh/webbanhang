import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import path from 'ultils/path'
import { useSelector } from 'react-redux'
import { Adminsidebar } from 'components'
const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector(state => state.user)
  if (!isLoggedIn ) return <Navigate to={`/${path.LOGIN}`} replace={true} />

  return (
    <div>
      <div className='w-full min-h-screen flex text-black'>
        <div className='flex-1  '>
          <Adminsidebar />
        </div>
        <div className='bg-white flex-4'>
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default AdminLayout 