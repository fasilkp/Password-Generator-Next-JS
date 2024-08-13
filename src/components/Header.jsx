'use client';

import React from 'react';
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBNavbar,
    MDBNavbarBrand,
    MDBRow,
} from 'mdb-react-ui-kit';
import icon from '../assets/images/lock.png'
import { useRouter } from 'next/navigation';
import api from '@/_lib/api';

export default function Header({  }) {
    const router = useRouter()
    const handleLogout = async () => {
        const { data } = await api.get("/auth/logout")
        router.push("/login")
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
                            <MDBCol className='d-flex justify-content-end'>
                                <MDBDropdown>
                                    <MDBDropdownToggle color={"light"} className='shadow-none'>
                                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                            width={30} height={30}
                                            alt="" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link onClick={handleLogout}>Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBCol>
                        </MDBRow>

                    </MDBContainer>
                </MDBContainer>
            </MDBNavbar>
            <header>
                {/* <MDBContainer>
                    <MDBRow className='mt-3'>
                        <h5>Home</h5>
                    </MDBRow>
                </MDBContainer> */}
                <div
                    className='p-5 text-center container bg-image'
                    style={{ backgroundSize: "contain", backgroundImage: "url('https://img.freepik.com/free-vector/data-protection-law-illustration-concept_114360-971.jpg?w=1380&t=st=1687240652~exp=1687241252~hmac=87bddd7e597ed3471f10b0572b73ba71d09541cb086d54d2e2c27a0b06c73902')", height: '350px' }}
                >
                </div>
            </header>
        </>
    );
}