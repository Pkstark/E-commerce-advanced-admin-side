import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function New_Password() {

  const [Password, setPassword] = useState('')
  const [ConfrimPassword, setConfrimPassword] = useState('')
  const [isError, setisError] = useState('')

  const navigate = useNavigate();

  const email = localStorage.getItem("fpemail");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(Validation()) {
      const pp ={
        email : email,
        password : Password
      }

      axios.post("http://localhost:2022/change/password", pp).then((data) => {
        console.log(data)
        alert(data.data.response)
        if(data.data.status === 1){
          navigate('/login')
        }
      })
    }

  }

const Validation = () => {
  if(Password === ConfrimPassword){
    setisError("")
    return true
  }
  else{
    setisError("Password miss Match")
    return false
  }
}

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
            <div className='card s8'>
              <div className='card-content'><br /><br />
                <h5 className='center'>Reset Password</h5><br /><br />
                <div className="row ">
                  <p className='center'><span style={{color : "red"}}>{isError}</span></p>
                  <div className="input-field col s12">
                    <i className='material-icons prefix'>visibility</i>
                    <input id="i" type="text" className="validate" required name='password' onChange={(e) => setPassword(e.target.value)}/>
                    <label for="username">Enter Password</label>
                  </div>
                </div>

                <div className="row ">
                  <div className="input-field col s12">
                    <i className='material-icons prefix'>visibility</i>
                    <input id="i" type="text" className="validate" required name='confrimpassword' onChange={(e) => setConfrimPassword(e.target.value)}/>
                    <label for="username">Enter ConfrimPassword</label>
                  </div>
                </div>

              </div>
              <div className='card-action center'><br />
                <button type='submit' className='btn'>Change Password</button>
              </div>
            </div>
          </form>
    </div>
  )
}

export default New_Password