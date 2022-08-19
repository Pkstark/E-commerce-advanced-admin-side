import axios from 'axios';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useNavigate } from 'react-router-dom';

function QuestCart() {
  const [Counter, setCounter] = useState(1);
  const [userData, setuserData] = useState([]);

  const navigate = useNavigate();

  const posted = (e) => {
    e.preventDefault();
    navigate('/dash')
  }

  const email = localStorage.getItem('email')
  const pn = localStorage.getItem('pn')
  const pp = localStorage.getItem('pp')
  const pof = localStorage.getItem('pof')
  const pd = localStorage.getItem('pd')
  const pId = localStorage.getItem('pId')
  const pph = localStorage.getItem('pph')
  const pc = localStorage.getItem('pc')

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



  const RemoveCounter = (e) => {
    if(Counter > 1 ){
      setCounter(Counter - 1)
    }
  }

  const AddCounter = (e) => {
    if(Counter < 5){
      setCounter(Counter + 1)
    }
  }

  const trigger = (e) => {
    var elems = document.querySelectorAll('.modal');
    var instance = M.Modal.init(elems , {})
  }

  return (
    <div>

<nav className='orange'>
        <div className="nav-wrapper container">
          <a href="" className="brand-logo">DevShip</a>
          <ul className="right">
            <li><a href="" onClick={posted}>Dashboard</a></li>
          </ul>
        </div>
      </nav>


      <div className = "container">
        <div className = "row">
          
        <div className='center'>
            <h5>Cart</h5>
          </div>

        <div class="col s3">
                <div class="card lime accent-3 z-depth-4  tooltipped" data-position="top" data-tooltip="View Our Product">
                  <div class="card-image">
                    <img src={`http://localhost:2022/${pph}`} style={{ width: "300px", height: "200px" }} className='responsive-img' />
                  </div>
                  <div class="card-content">
                    <p className='style3'>Product Name :{pn}</p>
                    <p className='style3'>Prize :&nbsp; Rs.&nbsp;<span className='style2'>{pp}</span> /-- </p>
                    <p className='style3'>OfferPrize :&nbsp;Rs. &nbsp;{pof} /--</p>
                    <p className='style3'>Discount : &nbsp;{pd}&nbsp;%</p><br/>
                    <div className='row'>
                    <div className='col s4'><a className=' btn-floating waves-effect orange darken-3 center'onClick={(e) => {
                        e.preventDefault();
                        RemoveCounter();
                      }}><i className='material-icons'>remove</i></a></div>
                      
                      <div className='col s4'><div className='style6 center'>{Counter}</div></div>
                      <div className='col s4'><a className=' btn-floating waves-effect orange darken-3 center' onClick={(e) => {
                        e.preventDefault();
                        AddCounter();
                      }}><i className='material-icons'>add</i></a></div>
                      
                    </div>
                  </div>
                  <div class="card-action center">
                    <button className='btn grey darken-4 style5 modal-trigger ' data-target="change" onClick={() => {
                      {userData.map((data) => {
                        window.localStorage.setItem("firstname",data.first_name);
                        trigger();
                      })}
                    }}>Order</button>
                  </div>
                </div>
              </div>
        </div>
      </div>


      <div id="change" className="modal lime accent-3 z-depth-4">
                  <form encType="multipart/form-data" >
                    <div className="modal-content">
                      <h4 className='center'>Product Summery</h4>
                      <div className='row'>
                        <div className='col s6'>
                          <p className='style25'>Catagroy : &nbsp; {pc}</p>
                          <p className='style25'>Product Name : {pn}  </p>
                          <p className='style25'>Product Prize :&nbsp; Rs.&nbsp; <span className='style20'>{pp}</span></p>
                          <p className='style25'>Offerprize :&nbsp; Rs.&nbsp;{pof}</p>
                          <p className='style25'>Quantity : {Counter}&nbsp;&nbsp;&nbsp;Qty</p>
                          <p className='style25'> Discount :&nbsp;% {pd}</p>
                          <p>Product Has been near by Order , you will Select your correct Address </p>
                        </div>
                        <div className='col s6'>
                          <img src = {`http://localhost:2022/${pph}`} className="style24" style={{ height: "200px", width: "200px" }} />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer lime accent-3 center">
                      <button type='submit' className='btn grey darken-4 style5' onClick={(e) => {
                        window.localStorage.setItem('catagroy',pc);
                        window.localStorage.setItem('name',pn);
                        window.localStorage.setItem('prize',pp);
                        window.localStorage.setItem('offerprize',pof);
                        window.localStorage.setItem('quantity',Counter);
                        window.localStorage.setItem('discount', pd);
                        window.localStorage.setItem('photo',pph);
                        window.localStorage.setItem('email',email);
                        window.localStorage.setItem('productId',pId);
                        navigate('/address');
                      }}>Order</button>
                    </div>
                  </form>
                </div>
      
    </div>
  )
}

export default QuestCart