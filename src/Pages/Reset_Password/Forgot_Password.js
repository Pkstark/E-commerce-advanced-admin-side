import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forgot_Password() {

  const [Email, setEmail] = useState('');
  const [userData, setuserData] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {


    e.preventDefault();

    window.localStorage.setItem("fpemail" , Email);

    const pp ={
      email : Email
    }

    axios.post("http://localhost:2022/forgot/password",pp).then((data) => {
      console.log(data)
      alert(data.data.message);
      if(data.data.status === 1) {
        navigate('/otp')
      }
    }).catch((err) => {
      console.log(err)
    })
    
  }



  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
            <div className='card '>
              <div className='card-content'><br /><br />
                <h5 className='center'>Forget Password</h5><br /><br />
                <div className="row ">
                  <div className="input-field col s12">
                    <i className='material-icons prefix'>email</i>
                    <input id="i" type="text" className="validate" required name='email' onChange={(e) => setEmail(e.target.value)}/>
                    <label for="username">Enter Validate Email</label>
                  </div>
                </div>
              </div>
              <div className='card-action center'><br />
                <button type='submit' className='btn'>Send Otp</button>
              </div>
            </div>
          </form>
    </div>
  )
}

export default Forgot_Password