import axios from 'axios';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useNavigate } from 'react-router-dom';

import Img from '../Assets/image.avif';
import Img1 from '../Assets/image2.avif';
import Img2 from '../Assets/image3.avif';

function Dashboard() {

  const [userData, setuserData] = useState([]);
  

  const email = localStorage.getItem('email')
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    const pk = {
      email: email
    }
    axios.post('http://localhost:2022/getdata', pk).then((data) => {
      console.log(data)
      setuserData(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const post = () => {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {});
  }


  const Push = (e) => {
    e.preventDefault();
  }

  const Push1 = (e) => {
    e.preventDefault();


  }

  const Push2 = (e) => {
    e.preventDefault();


  }

  const trigger = (e) => {
    e.preventDefault();
    navigate('/cart')
  }

  const Posted = (e) => {
    e.preventDefault();
    navigate('/address')
  }

  const Posted1 = (e) => {
    e.preventDefault();
    navigate('/order')
  }
  
  const V1 = "Mobile";
  const V2 = "Shoe";
  const V3 = "Shirt";

  const posted = (e) => {
    e.preventDefault();

    let elems = document.querySelectorAll('.modal');
    let trigg = M.Modal.init(elems, {})
}

const handleChange = (event,index) => {
  const values = [...userData];
  values[index][event.target.id] = event.target.value;
  setuserData(values);
}


  return (
    <div>

      <nav className='orange'>
        <div className="nav-wrapper container">
          <a href="" className="brand-logo">DevShip</a>
          <ul className="right">
            <li><a href="" onClick={trigger}>Cart</a></li>
            <li><a href="" onClick={Posted}>Address</a></li>
            <li><a href="" onClick={Posted1}>Order</a></li>
            <li><a href="" className='modal-trigger' data-target="change" onClick={posted}>Profile</a></li>
          </ul>
        </div>
      </nav>

      <div className='container'>
        {email != "" ? (<div>

          <h5 className='center'>Welcome to Devship, {userData.map((data,index) => {
          window.localStorage.setItem('firstname',data.first_name);

          return (<div key={index}>{data.first_name}

          <div id="change" className="modal cyan lighten-3">
                <form encType="multipart/form-data">
                    <div className="modal-content">
                        <h4 className='center'>Profile</h4>
                        <div className="row">
                            <div className="input-field col s6">
                                <input type="text" className="validate" id='first_name' value={data.first_name} onChange={(event) => handleChange(event,index)} name="first_name" required />
                            </div>
                            <div className="input-field col s6">
                                <input type="text" className="validate" id='surname' value={data.surname} name="surname" onChange={(event) => handleChange(event,index)} required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" className="validate " id='email' value={data.email} name="email" onChange={(event) => handleChange(event,index)} required />
                            </div>
                        </div>
                        <div className="row">
                            <select id='gender' className="browser-default cyan lighten-4" value={data.gender} name='gender' onChange={(event) => handleChange(event,index)} required>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                        </div>
                    </div>
                    <div className="modal-footer cyan lighten-3">
                        <button type='submit' className='btn center indigo' onClick={(e) => {
                          e.preventDefault();

                          {userData.map((data) => {

                            const pk = {
                              first_name : data.first_name,
                              surname : data.surname,
                              email : data.email,
                              gender : data.gender
                            }

                            console.log(pk)
                            
                            axios.post(`http://localhost:2022/client/update/${data._id}`,pk).then((datas) => {
                              console.log(datas);
                              if(datas.data.status === 1){
                                alert(datas.data.message);
                                getData();
                              }else{
                                alert("wrong")
                              }
                            }).catch((err) => {
                              console.log(err)
                            })
                        
                          })}
                        }}>Update</button>&nbsp;&nbsp;
                        <button type='submit' className='btn center indigo modal-close'>close</button>
                    </div>
                </form>
            </div>
          
          </div>)
        })}</h5>
        </div>) : (<div>
          <h5 className='center'>Welcome to DevShip, </h5>
          <h5 className='center'>Your Not Registered With Us, Please <a href='/'>Register Here !!!</a></h5>
        </div>) }
        
      </div><br/><br/>

      <div className='container'>
        <div className='row s12'>
          <div className='col s4'>
            <div className='card lime accent-3 z-depth-4 tooltipped' data-position="top" data-tooltip="View Mobile Product" onMouseEnter={post}>
              <div className="card-image">
                <img src={Img} className='responsive-img' />
                <span className="card-title">Mobile</span>
              </div>
              <div className="card-content">
                <p className='style3'>We Have a Verity of Mobile Product see More</p>
              </div>
              <div className="card-action center">
                <button className='btn grey darken-4' onClick={()=> {
                  window.localStorage.setItem('catagroy',V1);
                  navigate('/mobile')
                }}>View</button>
              </div>
            </div>
          </div>

          <div className='col s4'>
            <div className='card lime accent-3 z-depth-4 tooltipped' data-position="top" data-tooltip="View Shoe Product" onMouseEnter={post}>
              <div className="card-image">
                <img src={Img2} className='responsive-img' />
                <span className="card-title">Shoe</span>
              </div>
              <div className="card-content">
                <p className='style3'>We Have a Verity of Shoe Product see More</p>
              </div>
              <div className="card-action center">
                <button className='btn grey darken-4 ' onClick={() => {
                  window.localStorage.setItem('catagroy',V2);
                  navigate('/shoe')
                }}>View</button>
              </div>
            </div>
          </div>

          <div className='col s4'>
            <div className='card lime accent-3 z-depth-4 tooltipped' data-position="top" data-tooltip="View Shirts Product" onMouseEnter={post}>
              <div className="card-image">
                <img src={Img1} className='responsive-img' />
                <span className="card-title">Shirts</span>
              </div>
              <div className="card-content">
                <p className='style3'>We Have a Verity of Shirts Product see More</p>
              </div>
              <div className="card-action center">
                <button className='btn grey darken-4 ' onClick={()=> {
                  window.localStorage.setItem('catagroy',V3);
                  navigate('/shirt')
                }}>View</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard