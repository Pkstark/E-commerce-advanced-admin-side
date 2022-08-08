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
    navigate('/mobile')
  }

  const Push1 = (e) => {
    e.preventDefault();
    navigate('/shoe')

  }

  const Push2 = (e) => {
    e.preventDefault();
    navigate('/shirt')

  }

  const trigger = (e) => {
    e.preventDefault();
    navigate('/cart')
  }

  return (
    <div>

      <nav className='orange'>
        <div className="nav-wrapper container">
          <a href="" className="brand-logo">DevShip</a>
          <ul className="right">
            <li><a href="" onClick={trigger}>Cart</a></li>
            <li><a href="">Address</a></li>
            <li><a href="">Order</a></li>
          </ul>
        </div>
      </nav>

      <div className='container'>
        <h5 className='center'>Welcome to Devship, {userData.map((data) => {
          return (<div>{data.first_name}</div>)
        })}</h5>
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
                <button className='btn grey darken-4' onClick={Push}>View</button>
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
                <button className='btn grey darken-4 ' onClick={Push1}>View</button>
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
                <button className='btn grey darken-4 ' onClick={Push2}>View</button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Dashboard