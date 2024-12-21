import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Login() {
  const [credentials, setcredentials] = useState({ name: "", email: ""})
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))
    const response = await fetch("https://epiceatsbackend.vercel.app/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials")
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/")
    }



  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div>
        <Navbar/>
        </div>

      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label htmlFor="email" class="form-label">Email address</label>
            <input type="email" class="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className='m-3 btn btn-danger'>I'm a New User</Link>
        </form>
      </div>
      <div>

      </div>
      <div>
        <Footer/>
        </div>
    </div>
  )
}
