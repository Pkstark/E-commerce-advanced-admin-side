import axios from 'axios';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useNavigate } from 'react-router-dom';

function Shoe() {

  const navigate = useNavigate();
  const [ShoeData, setShoeData] = useState([]);
  const [Product, setProduct] = useState();
  const [availability, setavailability] = useState()

  const posted = (e) => {
    e.preventDefault();
    navigate('/dash')
  }

  useEffect(() => {
    getData();
  }, [])
  

  const getData = (e) => {

    axios.post("http://localhost:2022/product/shoe").then((data) => {
      console.log(data);
      setShoeData(data.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const AddCart = () => {
    
  }

  const email = localStorage.getItem('email')

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
            <li><a href="">Order</a></li>
            <li><a href="" onClick={posted}>Dashboard</a></li>
          </ul>
        </div>
      </nav>

      <div className='container'>
        <div className='row'>
          <div className='center'>
            <h5>Mobile Product</h5>
          </div>
          {ShoeData.map((datas) => {
            return (<div>
              <div class="col s3">
                <div class="card lime accent-3 z-depth-4  tooltipped" data-position="top" data-tooltip="View Our Product">
                  <div class="card-image">
                    <img src={`http://localhost:2022/${datas.photo}`} style={{ width: "300px", height: "200px" }} className='responsive-img' />
                  </div>
                  <div class="card-content">

                    <p className='style3'>Mobile Name :{datas.name}</p>
                    <p className='style3'>Prize :&nbsp; Rs.&nbsp;<span className='style2'>{datas.prize}</span> /-- </p>
                    <p className='style3'>OfferPrize :&nbsp;Rs. &nbsp;{datas.offerprize} /--</p>
                    <p className='style3'>Discount : &nbsp;{datas.discount}&nbsp;%</p><br />
                    <hr/>
                    <div className='center'>
                        <p className=''>{datas.availability === "true" ? (<div style={{ color: "green" }}>Instock</div>) : (<div style={{ color: "red" }}>OutOfStock</div>)}</p>
                    </div>
                  </div>
                  <div class="card-action center">
                    <button className='btn grey darken-4 style5' onClick={(e) => {
                      e.preventDefault();
                      
                      if(datas.availability === "true"){
                        const pp = {
                          name : datas.name,
                          prize : datas.prize,
                          offerprize : datas.offerprize,
                          discount : datas.discount,
                          email : email,
                          productId : datas.productId,
                          photo : datas.photo,
                          catagroy : datas.catagroy
                        }
                  
                        axios.post("http://localhost:2022/cart/create",pp).then((data) => {
                          console.log(data);
                          if(data.data.status === 1){
                            alert(data.data.message)
                          }else{
                            alert("wrong")
                          }
                        })
                      }
                      else{
                        alert("out of stock")
                      }

                    }}>AddCart</button>
                  </div>
                </div>

              </div>
            </div>)
          })}


        </div>
      </div>

    </div>
  )
}

export default Shoe