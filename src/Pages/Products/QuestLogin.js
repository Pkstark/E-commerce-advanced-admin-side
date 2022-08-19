import React, { useState } from 'react'
import Img from '../../Assets/image1.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function QuestLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    window.localStorage.setItem('email',email);
    
    const pp = {
      email : email,
      password : password
    }

    axios.post("http://localhost:2022/login",pp).then((data) => {
      console.log(data);
      if(data.data.status === 1){
        alert("Success");
        navigate('/.cart')
      }
    }).catch((err) => {
      console.log(err)
      alert("wrong")
    })
  }

  const passed = (e) => {
    e.preventDefault();
    navigate('/fpass')
  }
  return (
    <div>
      <div className='body'>
      <div className='row s12'>
        <div className='col s6'>
          <img src={Img} alt="jj" className='style1' />
        </div>

        <div className='col s6'>
          <form onSubmit={handleSubmit}>
            <div className='card '>
              <div className='card-content'><br /><br />
                <h5 className='center'>Login</h5><br /><br />
                <div className="row">
                  <div className="input-field col s12">
                    <i className='material-icons prefix'>email</i>
                    <input id="i" type="text" className="validate" required name='email' onChange={(e) => setEmail(e.target.value)} />
                    <label for="username">Email</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <i className='material-icons prefix'>visibility</i>
                    <input id="j" type="text" className="validate" required name='password' onChange={(e)=> setPassword(e.target.value)}/>
                    <label for="username">Password</label>
                  </div>
                </div>
                <p className='center' style={{color : "red"}}> <a href='/' onClick={ (e) => passed(e)}>Forgot Password ?</a></p>
              </div><br /><br />
              <div className='card-action center'><br />
                <button type='submit' className='btn'>Login</button>
              </div>
              <br />
              <p className='center'>You don't have a Account ? Please Register <a style={{ color: "blue" }} href="/register">Click here!!!</a></p>
              <br /><br /><br /><br /><br />
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default QuestLogin