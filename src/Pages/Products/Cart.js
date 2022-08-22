import axios from 'axios';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useNavigate } from 'react-router-dom';

function Cart() {

  const [CartData, setCartData] = useState([]);
  const [Counter, setCounter] = useState(1);

  const [counterId, setcounterId] = useState()
  const [userData, setuserData] = useState([])

  const [name, setname] = useState('');
  const [prize, setprize] = useState('');
  const [offerprize, setofferprize] = useState('');
  const [catagroy, setcatagroy] = useState('');
  const [discount, setdiscount] = useState('');
  const [photo, setphoto] = useState('');
  const [productId, setproductId] = useState('')


  const navigate = useNavigate();

  const posted = (e) => {
    e.preventDefault();
    navigate('/dash')
  }

  useEffect(() => {
    getData();
    getData1();
  }, [])

  const email = localStorage.getItem('email')
  const pn = localStorage.getItem('pn')
  const pp = localStorage.getItem('pp')
  const pof = localStorage.getItem('pof')
  const pd = localStorage.getItem('pd')
  const pId = localStorage.getItem('pId')
  const pph = localStorage.getItem('pph')
  const pc = localStorage.getItem('pc')

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

  const getData1 = () => {
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

  const productSummery = () =>{
    // e.preventDefault();
    var elems = document.querySelectorAll('.modal');
    var instance = M.Modal.init(elems , {})
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


  const Posted1 = (e) => {
    e.preventDefault();
    navigate('/order')
  }


  const HandleOrder = () => {
    // e.preventDefault();

    window.localStorage.setItem('catagroy',catagroy);
    window.localStorage.setItem('name',name);
    window.localStorage.setItem('prize',prize);
    window.localStorage.setItem('offerprize',offerprize);
    window.localStorage.setItem('quantity',Counter);
    window.localStorage.setItem('discount', discount);
    window.localStorage.setItem('photo',photo);
    window.localStorage.setItem('email',email);
    {userData.map((dad) => {
      window.localStorage.setItem('Uid',dad.userID);
    })}
    window.localStorage.setItem('productId',productId);
  }
  
  return (
    <div>

      <nav className='orange'>
        <div className="nav-wrapper container">
          <a href="" className="brand-logo">DevShip</a>
          <ul className="right">
            <li><a href="" onClick = {Posted1}>Order</a></li>
            <li><a href="" onClick={posted}>Dashboard</a></li>
          </ul>
        </div>
      </nav>

      <div className='container'>
        <div className='row'>
          <div className='center'>
            <h5>Cart</h5>
          </div>
          {email != "" ? (<div>

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
                      <div className='col s4'><a className=' btn-floating waves-effect orange darken-3 center'onClick={(e) => {
                        e.preventDefault();
                        setcounterId(datas._id);
                        RemoveCounter();
                      }}><i className='material-icons'>remove</i></a></div>
                      <div className='col s4'><div className='style6 center'>{counterId === datas._id ? (<div>{Counter}</div>) : (<div>1</div>)}</div></div>
                      <div className='col s4'><a className=' btn-floating waves-effect orange darken-3 center' onClick={(e) => {
                        e.preventDefault();
                        setcounterId(datas._id);
                        AddCounter();
                      }}><i className='material-icons'>add</i></a></div>
                    </div>
                  </div>
                  <div class="card-action center">
                    <button className='btn grey darken-4 style5 modal-trigger ' data-target="change" onClick={() => {
                      // e.preventDefault();
                      setname(datas.name);
                      setprize(datas.prize);
                      setofferprize(datas.offerprize);
                      setcatagroy(datas.catagroy);
                      setdiscount(datas.discount);
                      setphoto(datas.photo)
                      setproductId(datas.productId)
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

          </div>) : <div>
            
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
                    <button className='btn grey darken-4 style5 modal-trigger ' data-target="change" onClick={(e) => {
                      e.preventDefault();
                      window.localStorage.setItem("pq",Counter);
                      alert("Your not Registered Please Registered !!!");
                      navigate('/register')
                    }}>Order</button>
                  </div>
                </div>
              </div>

          </div>}
          


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
                          <p className='style25'>Quantity : {Counter}&nbsp;&nbsp;&nbsp;Qty</p>
                          <p className='style25'> Discount :&nbsp;% {discount}</p>
                          <p>Product Has been near by Order , you will Select your correct Address </p>
                        </div>
                        <div className='col s6'>
                          <img src = {`http://localhost:2022/${photo}`} className="style24" style={{ height: "200px", width: "200px" }} />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer lime accent-3 center">
                      <button type='submit' className='btn grey darken-4 style5' onClick={HandleOrder}><a href="/address" style={{color : "white"}}>Order</a></button>
                    </div>
                  </form>
                </div>


    </div>
  )
}

export default Cart