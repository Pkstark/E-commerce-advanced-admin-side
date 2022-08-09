import axios from 'axios';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useNavigate } from 'react-router-dom';

function Mobile() {

  const [MobileData, setMobileData] = useState([]);
  const [Product, setProduct] = useState();
  const [searchTerm, setsearchTerm] = useState('')

  const navigate = useNavigate();

  const posted = (e) => {
    e.preventDefault();
    navigate('/dash')
  }

  useEffect(() => {
    getData();
  }, [])

  const trigger = (e) => {
    e.preventDefault();
    navigate('/cart')
  }

  const getData = (e) => {

    axios.post("http://localhost:2022/product/mobile").then((data) => {
      console.log(data);
      setMobileData(data.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }


  const email = localStorage.getItem('email')

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
          <div className='col s6 center'>
            <h4>Mobile</h4>
          </div>
          <div className="input-field col s6">
            <input type="text" className="validate" onChange={event => { setsearchTerm(event.target.value) }} required />
            <label>Search Product</label>
          </div>
        </div><hr/>
        <div className='row'>
          {MobileData.filter((datas) => {
            if(searchTerm === ""){
              return datas
            }else if(datas.name.toLowerCase().includes(searchTerm.toLowerCase())){
              return datas
            }
          }).map((datas) => {
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
                    <hr />
                    <div className='center'>
                      <p className=''>{datas.availability === "true" ? (<div style={{ color: "green" }}>Instock</div>) : (<div style={{ color: "red" }}>OutOfStock</div>)}</p>
                    </div>
                  </div>
                  <div class="card-action center">
                    <button className='btn grey darken-4 style5' onClick={(e) => {
                      e.preventDefault();

                      if (datas.availability === "true") {
                        const pp = {
                          name: datas.name,
                          prize: datas.prize,
                          offerprize: datas.offerprize,
                          discount: datas.discount,
                          email: email,
                          productId: datas.productId,
                          photo: datas.photo,
                          catagroy: datas.catagroy
                        }

                        console.log(pp)

                        axios.post("http://localhost:2022/cart/create", pp).then((data) => {
                          console.log(data);
                          if (data.data.status === 1) {
                            alert(data.data.message)
                          } else {
                            alert("wrong")
                          }
                        })
                      }
                      else {
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

export default Mobile