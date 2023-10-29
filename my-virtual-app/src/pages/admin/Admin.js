import React from 'react'
import "./admin.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

const Admin = () => {
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();

    if (json.success) {
      //redirect
      // localStorage.setItem('admin', json.authtoken);
      sessionStorage.setItem('token', json.authtoken);
      navigate('/admin/dashboard')
    }
    else {
      navigate('/')
    }
  }

  const [formData, setFormData] = useState({});


  const handleChange = (event) => {
    console.log(event.target.value, event.target.name);

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <>
      <section className='admin-login-section'>
        <div className='login-div'>
          <p style={{ textAlign: "center" }} className="logo-heading text-white">
            <span style={{ color: "#6bd86b" }}>GriTi</span>
            <span >some</span>
          </p>
          <p className='text-secondary' style={{ textAlign: "center" }}>Logn In</p>

          <form onSubmit={handleSubmit} method="POST" action="http://localhost:5000/api/admin/login">
            <div className='inputclass'>
              <input onChange={handleChange}  name="username" placeholder="Username" type="email" className='inp inp1 inp2' />
            </div>

            <div className='inputclass'>
              <input onChange={handleChange}  name="password" placeholder="Password" type="password" className='inp inp1 inp2' />
            </div>

            <button type="submit" className="login_button btn-1 my-3">Log In</button>
          </form>


          <div className='text-white my-3' style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <a herf="#">Forget Your password?</a>
            </div>

            <div>
              <a herf="#">Createan account?</a>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Admin
