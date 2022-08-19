import axios from 'axios';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useNavigate } from 'react-router-dom';
import ReactPagination from 'react-paginate';

function Shoe() {

  const navigate = useNavigate();
  const [ShoeData, setShoeData] = useState([]);
  const [PageNumber, setPageNumber] = useState(0);

  const [name, setname] = useState('');
  const [range, setrange] = useState();
  const [Sort, setSort] = useState(false)

  const posted = (e) => {
    e.preventDefault();
    navigate('/dash')
  }

  useEffect(() => {
    getData();
  }, [])

  const catagroy = localStorage.getItem('catagroy')

  const getData = (e) => {

    setSort(true);

    const pk = {
      catagroy : catagroy,
      search : name,
      range : range,
      order : Sort
    }

    axios.post("http://localhost:2022/prize/range",pk).then((data) => {
      console.log(data)
      setShoeData(data?.data?.response?.result)
    }).catch((err) => {
      console.log(err)
    })
  }


  const email = localStorage.getItem('email')

  const trigger = (e) => {
    e.preventDefault();
    navigate('/cart')
  }

  const V1 = 2000;
  const V2 = 1000;
  const V3 = 800;

  const userPerPage = 4;
  const PageVisited = PageNumber * userPerPage;
  const page = Math.ceil(ShoeData.length / userPerPage);

  const displayUsers = ShoeData.filter((datas) => {
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

  })

  const HandlePageClick = ({ selected }) => {
    setPageNumber(selected);
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
          <div className='col s3 center'>
            <h4>Shoe</h4>
          </div>
          <div className="input-field col s3">
            <input type="text" className="validate" onChange={(e) => setname(e.target.value)} required />
            <label>Search Product</label>
          </div>
          <div className='col s3 center'>
            <select id='range' className="browser-default style13" onChange={(e) => setrange(e.target.value)} name='range' required>
              <option >All Prices</option>
              <option value={V1} >less then 2000</option>
              <option value={V2} >less then 1000</option>
              <option value={V3}>less 800</option>
            </select>
          </div>
          <div className='col s3 center'>
          <button className='btn indigo style12' onClick={getData}>sort</button>&nbsp;&nbsp;
          <button className='btn indigo style12' onClick={getData}>search</button>
          </div>
        </div><hr/>
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

export default Shoe