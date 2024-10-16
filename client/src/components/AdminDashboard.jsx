import React from 'react'
import AdminNav from './AdminNav'
import { useSelector } from 'react-redux'


const AdminDashboard = () => {

const user =  useSelector(state => state.userAuth)
console.log(user);

  return (
    <div>
      <AdminNav />
    </div>
  )
}

export default AdminDashboard
