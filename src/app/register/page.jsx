'use client';

import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBNavbar,
  MDBRow,
  MDBCol,
  MDBNavbarBrand,
  MDBSpinner
}
  from 'mdb-react-ui-kit';
import Link from 'next/link'
import axios from 'axios';
import icon from '../../assets/images/lock.png'
import validatePassword from '../../_lib/validatePassword';
import { useRouter } from 'next/navigation';


export default function Register({  }) {
  const [email, setEmail] = useState("")
  const [err, setErr] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()



  const handlePassword = (e) => {
    setPassword(e.target.value);
    const validationPassword = validatePassword(e.target.value)
    if (!validationPassword.status) {
      setErr(validationPassword.message[0].message)
    } else {
      setErr("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false)
    let { data } = await axios.post("/api/auth/register", { name, email, password });
    if (data.err) {
      setErr(data.message)
    } else {
      router.push("/")
    }
    setLoading(true)
  }
  return (
    <>
      <MDBNavbar light bgColor='light' className='position-sticky sticky-top'>
        <MDBContainer>
          <MDBContainer fluid className='p-0'>
            <MDBRow>
              <MDBCol>
                <MDBNavbarBrand href='#'>
                  <img
                    src={icon}
                    height='30'
                    alt=''
                    loading='lazy'
                  />
                  <b style={{ fontSize: "1rem", marginLeft: "5px" }}>PassGen</b>
                </MDBNavbarBrand>
              </MDBCol>
            </MDBRow>

          </MDBContainer>
        </MDBContainer>
      </MDBNavbar>
      <div className='d-flex justify-content-center align-items-center h-100 pt-5 mt-5' style={{ height: "100vh" }} >
        

        <MDBContainer className="p-3 my-5 d-flex flex-column h-50" style={{ width: "500px", maxWidth: "95%" }}>
          <h3 className='text-center'>Register to PassGen</h3>
          <span className='mt-5'></span>

          <MDBInput wrapperClass='mb-4' size='lg' value={name} onChange={(e) => setName(e.target.value)} label='Name' id='form1' type='text' />
          <MDBInput wrapperClass='mb-4' size='lg' value={email} onChange={(e) => setEmail(e.target.value)} label='Email address' id='form1' type='email' />
          <MDBInput wrapperClass='mb-4' size='lg' value={password} onChange={handlePassword} label='Password' id='form2' type='password' />
          {
            err &&
            <div className="text-left">
              <p className='text-danger'>{err}</p>
            </div>
          }

          <MDBBtn className="mb-4" color='danger' disabled={password == "" || email == "" || name == "" || !validatePassword(password).status} size='lg' onClick={handleSubmit}>
            Sign Up
            {
              loading &&
              <MDBSpinner role='status' className='ms-2' size='sm'>
                <span className='visually-hidden'>Loading...</span>
              </MDBSpinner>
            }
            </MDBBtn>

          <div className="text-center">
            <p>Already a member? <Link href="/login" className='text-danger'>Login</Link></p>
          </div>

        </MDBContainer>
      </div>
    </>


  );
}