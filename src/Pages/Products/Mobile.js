import axios from 'axios';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useNavigate } from 'react-router-dom';
import ReactPagination from 'react-paginate';

function Mobile() {

  const [MobileData, setMobileData] = useState([]);
  const [PageNumber, setPageNumber] = useState(0);

  const [name, setname] = useState('');
  const [range, setrange] = useState();
  const [Sort, setSort] = useState(false)

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
    setSort(true)
    const pk = {
      catagroy: catagroy,
      search: name,
      range: range,
      order : Sort
    }

    axios.post("http://localhost:2022/prize/range", pk).then((data) => {
      console.log(data)
      setMobileData(data?.data?.response?.result)
    }).catch((err) => {
      console.log(err)
    })
  }


  const email = localStorage.getItem('email')
  const catagroy = localStorage.getItem('catagroy')

  const V1 = 16000;
  const V2 = 30000;
  const V3 = 100000;
  const V = null;


  const HandlePageClick = ({ selected }) => {
    setPageNumber(selected);
  }

  const userPerPage = 4;
  const PageVisited = PageNumber * userPerPage;
  const page = Math.ceil(MobileData.length / userPerPage);

  const displayUsers = MobileData.filter((datas) => {
    if(name == ""){
      return datas
    }else if(datas.name.toLowerCase().includes(name.toLowerCase())){
      return datas
    }
  }).slice(PageVisited, PageVisited + userPerPage).map((datas) => {
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
  
              if(email != ""){
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
              }else{
                window.localStorage.setItem("pn",datas.name)
                window.localStorage.setItem("pp",datas.prize)
                window.localStorage.setItem("pof",datas.offerprize)
                window.localStorage.setItem("pd",datas.discount)
                window.localStorage.setItem("pId",datas.productId)
                window.localStorage.setItem("pph",datas.photo)
                window.localStorage.setItem("pc",datas.catagroy)
                alert("cart added tt")
              }
            }}>AddCart</button>
          </div>
        </div>
  
      </div>
    </div>)
  })

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
          <div className='col s3 center'>
            <h4 className='center'>Mobile</h4>
          </div>
          <div className="input-field col s3 center">
            <input type="text" className="validate" onChange={(e) => setname(e.target.value)} required />
            <label>Search Product</label>
          </div>
          <div className='col s3 center'>
            <select id='range' className="browser-default style13" onChange={(e) => setrange(e.target.value)} name='range' required>
              <option >All Prices</option>
              <option value={V1} >less then 16000</option>
              <option value={V2} >less then 30000</option>
              <option value={V3}>less 100000</option>
            </select>
          </div>
          <div className='col s3 center'>
            <button className='btn indigo style12' value={Sort} onClick={getData} >sort</button>&nbsp;&nbsp;
            <button className='btn indigo style12' onClick={getData} >search</button>
          </div>
        </div><hr />
        <div className='row'>
          {displayUsers}
        </div>

        <div className='center'>
        <ReactPagination
            previousLabel={"Prev"}
            pageCount={page}
            onPageChange={HandlePageClick}
            containerClassName={"pagination style15"}
            pageClassName={"waves-effect"}
            activeClassName={"active indigo"}
            previousLinkClassName={"style16"}
            nextLinkClassName={"style17"}
          />
        </div>
      </div>

    </div>
  )
}

export default Mobile