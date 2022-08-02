import React, { useState } from 'react';
import Img from '../Assets/image1.jpg';
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Register() {

  const [First_Name, setFirst_Name] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrim_Password, setConfrim_Password] = useState("");
  const [terms, setTerms] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    window.localStorage.setItem("firstname",First_Name);

    const pp ={
      first_name : First_Name,
      surname : surName,
      email : email,
      password : password,
      confirmPassword : confrim_Password,
      agree_terms : terms
    }
    axios.post("http://localhost:2022/register",pp).then((data) => {
      console.log(data);
      alert("register Success")
      navigate("/login")
    }).catch((err) => {
      console.log(err)
    })

    let pk = document.getElementById('g');
    pk.value = "";
    let pk1 = document.getElementById('h');
    pk1.value = "";
    let pk2 = document.getElementById('i');
    pk2.value = "";
    let pk3 = document.getElementById('j');
    pk3.value = "";
    let pk4 = document.getElementById('k');
    pk4.value = "";
    let pk5 = document.getElementById('l');
    pk5.value = "";

  }


  return (
    <div className='body'>
      <div className='row s12'>
        <div className='col s6'>
          <img src={Img} alt="jj" className='style' />
        </div>

        <div className='col s6'>
          <form onSubmit={handleSubmit}>
            <div className='card style1'>
              <div className='card-content'><br /><br />
                <h5 className='center'>Register</h5><br /><br />
                <div className="row">
                  <div className="input-field col s6">
                    <i className='material-icons prefix'>account_circle</i>
                    <input id="g" type="text" className="validate" required name='firstName' onChange={(e) => setFirst_Name(e.target.value)} />
                    <label for="username">First_Name</label>
                  </div>

                  <div className="input-field col s6">
                    <i className='material-icons prefix'>account_circle</i>
                    <input id="h" type="text" className="validate" required name='surname' onChange={(e) => setSurName(e.target.value)} />
                    <label for="username">SurName</label>
                  </div>

                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <i className='material-icons prefix'>email</i>
                    <input id="i" type="text" className="validate" required name='email' onChange={(e) => setEmail(e.target.value)} />
                    <label for="username">Email</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <i className='material-icons prefix'>visibility</i>
                    <input id="j" type="text" className="validate" required name='password' onChange={(e) => setPassword(e.target.value)} />
                    <label for="username">Password</label>
                  </div>

                  <div className="input-field col s6">
                    <i className='material-icons prefix'>visibility</i>
                    <input id="k" type="text" className="validate" required name='confrimpassword' onChange={(e) => setConfrim_Password(e.target.value)} />
                    <label for="username">confirm_Password</label>
                  </div>
                </div>
                <p className='center'>
                  <label>
                    <input id='l' value={true} name="term" type="checkbox" onChange={(e) => setTerms(e.target.value)} required />
                    <span>Agree terms and Conditions</span>
                  </label>
                </p><br />
              </div>
              <div className='card-action center'>
                <button type='submit' className='btn'>Register</button>
              </div>
              <br />
              <p className='center'>Already Registered ? Please Login <a style={{ color: "blue" }} href="/login">Click here!!!</a></p>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register