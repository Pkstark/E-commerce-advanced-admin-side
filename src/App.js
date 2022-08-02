import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Otp from './Pages/Reset_Password/Otp';
import Forgot_Password from './Pages/Reset_Password/Forgot_Password';
import New_Password from './Pages/Reset_Password/New_Password'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dash' element={<Dashboard/>}/>
          <Route path='/fpass' element={<Forgot_Password/>}/>
          <Route path='/otp' element={<Otp/>}/>
          <Route path='/npass' element={<New_Password/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App