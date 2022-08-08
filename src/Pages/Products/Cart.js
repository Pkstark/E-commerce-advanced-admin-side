import axios from 'axios';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useNavigate } from 'react-router-dom';

function Cart() {

  const [CartData, setCartData] = useState([]);

  const [name, setname] = useState('');
  const [prize, setprize] = useState('');
  const [offerprize, setofferprize] = useState('');
  const [catagroy, setcatagroy] = useState('');
  const [discount, setdiscount] = useState('');
  const [photo, setphoto] = useState('');


  const navigate = useNavigate();

  const posted = (e) => {
    e.preventDefault();
    navigate('/dash')
  }

  useEffect(() => {
    getData();

    console.log(CartData)
  }, [])

  const email = localStorage.getItem('email')

  const getData = (e) => {
    const pp = {
      email : email
    }
    axios.post("http://localhost:2022/cart/data",pp).then((data) => {
      console.log(data);
      setCartData(data.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const productSummery = (e) =>{
    var elems = document.querySelectorAll('.modal');
    var instance = M.Modal.init(elems , {})
  }
  
  return (
    <div>

      <nav className='orange'>
        <div className="nav-wrapper container">
          <a href="" className="brand-logo">DevShip</a>
          <ul className="right">
            <li><a href="">Order</a></li>
            <li><a href="" onClick={posted}>Dashboard</a></li>
          </ul>
        </div>
      </nav>

      <div className='container'>
        <div className='row'>
          <div className='center'>
            <h5>Cart</h5>
          </div>
          {CartData.map((datas) => {
            return (<div>
              <div class="col s3">
                <div class="card lime accent-3 z-depth-4  tooltipped" data-position="top" data-tooltip="View Our Product">
                  <div class="card-image">
                    <img src={`http://localhost:2022/${datas.photo}`} style={{ width: "300px", height: "200px" }} className='responsive-img' />
                  </div>
                  <div class="card-content">
                    <p className='style3'>Product Name :{datas.name}</p>
                    <p className='style3'>Prize :&nbsp; Rs.&nbsp;<span className='style2'>{datas.prize}</span> /-- </p>
                    <p className='style3'>OfferPrize :&nbsp;Rs. &nbsp;{datas.offerprize} /--</p>
                    <p className='style3'>Discount : &nbsp;{datas.discount}&nbsp;%</p><br/>
                    <div className='row'>
                      <div className='col s4'><a className=' btn-floating waves-effect orange darken-3 center'><i className='material-icons'>remove</i></a></div>
                      <div className='col s4'><div className='style6 center'>1</div></div>
                      <div className='col s4'><a className=' btn-floating waves-effect orange darken-3 center'><i className='material-icons'>add</i></a></div>
                    </div>
                  </div>
                  <div class="card-action center">
                    <button className='btn grey darken-4 style5 modal-trigger ' data-target="change" onClick={(e) => {
                      e.preventDefault();
                      setname(datas.name);
                      setprize(datas.prize);
                      setofferprize(datas.offerprize);
                      setcatagroy(datas.catagroy);
                      setdiscount(datas.discount);
                      setphoto(datas.photo)
                      productSummery();
                    }}>Order</button>&nbsp;&nbsp;
                    <button className='btn grey darken-4 style5' onClick={(e) => {
                      e.preventDefault();

                      axios.post(`http://localhost:2022/cart/delete/${datas._id}`).then((data) => {
                        console.log(data);
                        if(data.data.status === 1){
                          getData();
                          alert(data.data.message);
                        }else{
                          alert("wrong")
                        }
                      })
                    }}>Remove</button>
                  </div>
                </div>
              </div>
            </div>)
          })}


        </div>
      </div>
      

      <div id="change" className="modal lime accent-3 z-depth-4">
                  <form encType="multipart/form-data" >
                    <div className="modal-content">
                      <h4 className='center'>Product Summery</h4>
                      <div className='row'>
                        <div className='col s6'>
                          <p className='style25'>Catagroy : &nbsp; {catagroy}</p>
                          <p className='style25'>Product Name : {name}  </p>
                          <p className='style25'>Product Prize :&nbsp; Rs.&nbsp; <span className='style20'>{prize}</span></p>
                          <p className='style25'>Offerprize :&nbsp; Rs.&nbsp;{offerprize}</p>
                          <p className='style25'>Quantity : &nbsp;&nbsp;&nbsp;Qty</p>
                          <p className='style25'> Discount :&nbsp;% {discount}</p>
                          <p>Product Has been near by Order , you will Select your correct Address </p>
                        </div>
                        <div className='col s6'>
                          <img src = {`http://localhost:2022/${photo}`} className="style24" style={{ height: "200px", width: "200px" }} />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer lime accent-3 center">
                      <button type='submit' className='btn grey darken-4 style5'>Upload</button>
                    </div>
                  </form>
                </div>


    </div>
  )
}

export default Cart