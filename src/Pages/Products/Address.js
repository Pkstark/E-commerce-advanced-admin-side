import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useNavigate } from 'react-router-dom';
import './address.css'
import axios from 'axios';

function Address() {

  const navigate = useNavigate();
  
  const [uploadAddress, setuploadAddress] = useState([])
  const [AddressData, setAddressData] = useState([]);
  const [UpdateId, setUpdateId] = useState()
  const [SelectId, setSelectId] = useState('')
  const [SelectedProduct, setSelectedProduct] = useState('');
  const [AddressDeleted, setAddressDeleted] = useState('')

  const Posted = (e) => {
    e.preventDefault();
    navigate('/dash')
  }

  const Posted1 = (e) => {
    e.preventDefault();
    navigate('/order')
  }

  const addForm = () => {
    setuploadAddress([...uploadAddress, { flatno: "", line1: "", line2: "", state: "", city: "", pincode: "", phoneno: "" }])
  }

  const email = localStorage.getItem('email');


  const removeField = (index) => {
    const values = [...uploadAddress];
    values.splice(index, 1);
    setuploadAddress(values)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(uploadAddress)

    {
      uploadAddress.map((data) => {

        const pk = {
          flatno: data.flatno,
          line1: data.line1,
          line2: data.line2,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          phoneno: data.phoneno,
          email: email
        }

        axios.post("http://localhost:2022/address/add", pk).then((datas) => {
          console.log(datas);
          if (datas.data.status === 1) {
            alert(datas.data.message)
            getData();
          } else {
            alert('Address not added')
          }
        })
      })
    }
  }

  useEffect(() => {
    getData();
  }, [])


  const getData = () => {

    const pk = {
      email: email
    }

    axios.post('http://localhost:2022/address/data', pk).then((data) => {
      console.log(data);
      setAddressData(data.data.data);
    }).catch((err) => {
      console.log(err)
    })

  }

  const eventChange = (e, index) => {
    const Values = [...uploadAddress];
    Values[index][e.target.name] = e.target.value
    setuploadAddress(Values);
  }


  const HandleUpdate = (e) => {

    {
      AddressData.map((data) => {

        if (UpdateId === data._id) {
          const pk = {
            flatno: data.flatno,
            line1: data.line1,
            line2: data.line2,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            phoneno: data.phoneno
          }

          axios.post(`http://localhost:2022/address/update/${UpdateId}`, pk).then((data) => {
            console.log(data);
            if (data.data.status === 1) {
              alert(data.data.message);
              getData();
            } else {
              alert("wrong")
            }
          }).catch((err) => {
            console.log(err)
          })
        }

      })
    }

  }

  const HandleChange = (event, index) => {
    const values = [...AddressData];
    values[index][event.target.id] = event.target.value;
    setAddressData(values);
    console.log(values);
  }

  const AddressDelete = (e) => {

    e.preventDefault();

    axios.post(`http://localhost:2022/address/delete/${AddressDeleted}`).then((data) => {
      console.log(data);
      if (data.data.status === 1) {
        alert(data.data.message);
        getData();
      }
    }).catch((err) => {
      alert("Somthing Wrong")
    })

  }

  const getTrig = () => {
    var elems = document.querySelectorAll('.modal');
    var trig = M.Modal.init(elems, {});
  }


  const catagroy = localStorage.getItem('catagroy');
  const name = localStorage.getItem('name');
  const prize = localStorage.getItem('prize');
  const offerprize = localStorage.getItem('offerprize');
  const quantity = localStorage.getItem('quantity');
  const discount = localStorage.getItem('discount');
  const photo = localStorage.getItem('photo');
  const email1 = localStorage.getItem('email');
  const firstname = localStorage.getItem('firstname');
  const Uid = localStorage.getItem('Uid');

  const HandleOrder = (e) => {
    // e.preventDefault();


    const pk = {
      catagroy : catagroy,
      name : name,
      photo : photo,
      prize : prize,
      offerprize : offerprize,
      discount : discount,
      quantity : quantity,
      Uid : Uid,
      email : email1,
      clientname : firstname,
      flatno : SelectedProduct.flatno,
      line1 : SelectedProduct.line1,
      line2 : SelectedProduct.line2,
      city : SelectedProduct.city,
      state : SelectedProduct.state,
      pincode : SelectedProduct.pincode,
      phoneno : SelectedProduct.phoneno
    }

    axios.post("http://localhost:2022/order/add",pk).then((data) => {
      console.log(data);
      if(data.data.status === 1){
        alert(data.data.message);
        // navigate('/order')
      }else{
        alert("wrong")
      }
    })
  }

  return (
    <div className='scroll'>

      <nav className='orange'>
        <div className="nav-wrapper container">
          <a href="" className="brand-logo">DevShip</a>
          <ul className="right">
            <li><a href="" onClick={Posted1}>Order</a></li>
            <li><a href="" onClick={Posted}>Dashboard</a></li>
          </ul>
        </div>
      </nav>

      <div className='container'>
        <div className='center'>
          <h5>Address</h5>
        </div>
        <div className='row'>
          {AddressData.map((datas, index) => {
            return (<>
              <form key={index}>
                <div className='col s4'>
                  <a className="btn-floating red right modal-trigger" data-target="change" onClick={(e) => {
                    setAddressDeleted(datas._id)
                    getTrig();
                  }}>
                    <i className="material-icons" >cancel</i>
                  </a>
                  <div className='card'>
                    {SelectId === datas._id ? (<div className='center'><p className='style8'>Selected</p></div>) : (<></>)}
                    <div className='card-content'>
                      <h5 className='center'>Address</h5>
                      <div className='row'>

                        <div className="input-field col s6">
                          <input type="text" className="validate" id='flatno' value={datas.flatno} onChange={(event) => HandleChange(event, index)} name="flatno" required />
                        </div>

                        <div className="input-field col s6">
                          <input type="text" className="validate" id='line1' value={datas.line1} onChange={(event) => HandleChange(event, index)} name="line1" required />
                        </div>
                      </div>

                      <div className='row'>
                        <div className="input-field col s6">
                          <input type="text" className="validate" id='line2' name="line2" value={datas.line2} onChange={(event) => HandleChange(event, index)} required />
                        </div>
                        <div className="input-field col s6">
                          <input type="text" className="validate" id='city' name="city" value={datas.city} onChange={(event) => HandleChange(event, index)} required />
                        </div>
                      </div>

                      <div className='row'>
                        <div className="input-field col s6">
                          <input type="text" className="validate" id='state' name="state" value={datas.state} onChange={(event) => HandleChange(event, index)} required />
                        </div>

                        <div className="input-field col s6">
                          <input type="text" className="validate" id='pincode' name="pincode" value={datas.pincode} onChange={(event) => HandleChange(event, index)} required />
                        </div>
                      </div>

                      <div className='row '>
                        <div className="input-field col s12">
                          <input type="text" className="validate" id='phoneno' name="phoneno" value={datas.phoneno} onChange={(event) => HandleChange(event, index)} required />
                        </div>
                      </div>

                      <div className='card-action center'>
                        <button className='btn' onClick={(e) => {
                          e.preventDefault();
                          setSelectId(datas._id);
                          setSelectedProduct({
                            flatno : datas.flatno,
                            line1 : datas.line1,
                            line2 : datas.line2,
                            city : datas.city,
                            state : datas.state,
                            pincode : datas.pincode,
                            phoneno : datas.phoneno,
                          })
                        }}>Select</button>&nbsp;&nbsp;
                        <button className='btn' onClick={(e) => {
                          e.preventDefault();
                          setUpdateId(datas._id);
                          HandleUpdate();
                        }}>Update</button>
                      </div>

                    </div>
                  </div>
                </div>
              </form>
            </>)
          })}
        </div>
      </div>


      <div id="change" className="modal lime accent-3 z-depth-4">
        <form>
          <div className="modal-content">
            <h4 className='center'>Delete Address</h4>
            <p className='center'>Are You Sure ? you wnat to Delete this Address...!!!</p>
          </div>
          <div className="modal-footer lime accent-3 z-depth-4">
            <button type='submit' className='btn modal-close indigo' onClick={AddressDelete}>Delete</button>
          </div>
        </form>
      </div>


      <div id="change1" className="modal lime accent-3 z-depth-4">
        <form encType="multipart/form-data" >
          <div className="modal-content">
            <h4 className='center'>Order Summery</h4>
            <div className='row'>
              <div className='col s4'>
                <h5 className='center'>Product</h5>
                <p className='style25'>Catagroy : {catagroy} &nbsp;</p>
                <p className='style25'>Product Name : {name}  </p>
                <p className='style25'>Product Prize :&nbsp; Rs.&nbsp; <span className='style20'>{prize}</span></p>
                <p className='style25'>Offerprize :&nbsp; Rs.&nbsp;{offerprize}</p>
                <p className='style25'>Quantity : {quantity}&nbsp;&nbsp;&nbsp;Qty</p>
                <p className='style25'> Discount :&nbsp; {discount} % </p>
              </div>
              <div className='col s4'>
                <h5 className='center'>Address</h5>
                <p>Flat : {SelectedProduct.flatno} </p>
                <p>line1 : {SelectedProduct.line1}</p>
                <p>line2 : {SelectedProduct.line2}</p>
                <p>City : {SelectedProduct.city}</p>
                <p>State : {SelectedProduct.state}</p>
                <p>Pincode : {SelectedProduct.pincode}</p>
                <p>Phone no : {SelectedProduct.phoneno}</p>
              </div>
              <div className='col s4'>
                <h5>Product Photo</h5>
                <img src={`http://localhost:2022/${photo}`} className="style24" style={{ height: "200px", width: "200px" }} />
              </div>
            </div>
            <h5 className='center'>Are Sure Want to Order this Project</h5>
          </div>
          <div className="modal-footer lime accent-3 center">
            <button type='submit' className='btn grey darken-4 style5' onClick={(e) =>HandleOrder(e)}><a href='/order' style={{color : "white"}}>Order</a></button>
          </div>
        </form>
      </div>

      <div className='container'>
        <div className='right'>
          <button className='btn style9  modal-trigger' type='submit'  data-target="change1" onClick={(e) => {
            getTrig();
          }}>Order</button>
        </div>&nbsp;

        <div className='right'>
          <button className='btn style10' type='submit' onClick={handleSubmit}>Submit</button>
        </div>
        <hr />
        <form encType="multipart/form-data">
          <button className="btn-floating yellow" disabled={AddressData.length >= 3 || uploadAddress.length >= 3} onClick={() => addForm()}>
            <i className="material-icons left">add</i>
          </button>
          <div className='row'>
            {uploadAddress.map((datas, index) => {
              return (<div key={index}>
                <div className='col s4'>
                  <a className="btn-floating red right" >
                    <i className="material-icons" onClick={() => removeField(index)}>cancel</i>
                  </a>
                  <div className='card'>
                    <div className='card-content'>
                      <h5 className='center'>Address</h5>
                      <div className='row'>
                        <div className="input-field col s6">
                          <input type="text" className="validate" id='a' name="flatno" onChange={(e) => eventChange(e, index)} required />
                          <label for="Adminpassword">Flat No</label>
                        </div>

                        <div className="input-field col s6">
                          <input type="text" className="validate" id='b' name="line1" onChange={(e) => eventChange(e, index)} required />
                          <label>Address 1</label>
                        </div>
                      </div>

                      <div className='row'>
                        <div className="input-field col s6">
                          <input type="text" className="validate" id='c' name="line2" onChange={(e) => eventChange(e, index)} required />
                          <label>Address 2</label>
                        </div>

                        <div className="input-field col s6">
                          <input type="text" className="validate" id='d' name="city" onChange={(e) => eventChange(e, index)} required />
                          <label>City</label>
                        </div>
                      </div>

                      <div className='row'>
                        <div className="input-field col s6">
                          <input type="text" className="validate" id='e' name="state" onChange={(e) => eventChange(e, index)} required />
                          <label>State</label>
                        </div>

                        <div className="input-field col s6">
                          <input type="text" className="validate" id='f' name="pincode" onChange={(e) => eventChange(e, index)} required />
                          <label>Pincode</label>
                        </div>
                      </div>
                      <div className='row '>
                        <div className="input-field col s12">
                          <input type="text" className="validate" id='g' name="phoneno" onChange={(e) => eventChange(e, index)} required />
                          <label>Mobile number</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
            })}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Address