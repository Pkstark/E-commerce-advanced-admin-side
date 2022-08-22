import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Otp from './Pages/Reset_Password/Otp';
import Forgot_Password from './Pages/Reset_Password/Forgot_Password';
import New_Password from './Pages/Reset_Password/New_Password';
import Mobile from './Pages/Products/Mobile';
import Shoe from './Pages/Products/Shoe';
import Shirt from './Pages/Products/Shirt';
import Cart from './Pages/Products/Cart';
import Address from './Pages/Products/Address';
import Order from './Pages/Products/Order';
import QuestRegister from './Pages/Products/QuestRegister';
import QuestLogin from './Pages/Products/QuestLogin';
import QuestCart from './Pages/Products/QuestCart';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dash' element={<Dashboard/>}/>
          <Route path='/fpass' element={<Forgot_Password/>}/>
          <Route path='/otp' element={<Otp/>}/>
          <Route path='/npass' element={<New_Password/>}/>
          <Route path='/mobile' element={<Mobile/>}/>
          <Route path='/shoe' element={<Shoe/>}/>
          <Route path='/shirt' element={<Shirt/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/address' element={<Address/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/register' element={<QuestRegister/>}/>
          <Route path='/.login' element={<QuestLogin/>}/>
          <Route path='/.cart' element={<QuestCart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App