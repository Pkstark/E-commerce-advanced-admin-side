import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Otp() {

  const [OTP, setOTP] = useState('');
  const navigate = useNavigate();


  const email = localStorage.getItem("fpemail");

  const handleSubmit = ( e) => {

    e.preventDefault();
    const pp = {
      email : email,
      otp : OTP
    }

    if(Validation()){
      axios.post("http://localhost:2022/verify/otp",pp).then((data)=>{
        console.log(data.data.response)
        alert(data.data.response);
        if(data.data.status === 1){
          navigate('/npass')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
    else{
      alert("Please Enter the Valid OTP!!!")
    }
  }


  const Validation = () => {

    if(OTP.length != 6){
      return false
    }
    return true
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
            <div className='card '>
              <div className='card-content'><br /><br />
                <h5 className='center'> Validate OTP</h5><br /><br />
                <p className='center' >Please Check Your Mail, You will Recieved the Otp , please Enter the otp Below</p><br/><br/>
                <div className="row ">
                  <div className="input-field col s12">
                    <i className='material-icons prefix'>visibility</i>
                    <input id="i" type="text" className="validate" required name='otp' onChange={(e) => setOTP(e.target.value)}/>
                    <label for="username">Enter Validate OTP</label>
                  </div>
                </div>
              </div>
              <div className='card-action center'><br />
                <button type='submit' className='btn'>Validate</button>
              </div>
            </div>
          </form>
    </div>
  )
}

export default Otp