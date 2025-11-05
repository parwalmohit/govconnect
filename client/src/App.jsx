import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}

export default App