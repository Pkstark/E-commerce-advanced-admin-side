import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Dashboard() {

  const [userData, setuserData] = useState([]);
  
  const email = localStorage.getItem('email')

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    const pk = {
      email : email
    }
    axios.post('http://localhost:2022/getdata',pk).then((data) => {
      console.log(data)
      setuserData(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  
  return (
    <div>
        <div className='container'>
            <h5 className='center'>Welcome to Devship, {userData.map((data) => {
              return(<div>{data.first_name}</div>)
            })}</h5>
        </div>
    </div>
  )
}

export default Dashboard