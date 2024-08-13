'use client';

import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow
} from 'mdb-react-ui-kit';
import Header from '../components/Header';
import AddPasswordModal from '../modal/AddPasswordModal'
import GeneratePasswordModal from '../modal/GeneratePasswordModal';
import copyToClipboard from '../_lib/copyToClipboard';
import Swal from 'sweetalert2';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import api from '@/_lib/api';




export default function Home() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [list, setList] = useState([])
    const [open, setOpen] = useState(false)
    const [showGenerateModal, setShowGenerateModal] = useState(false)
    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        const { data } = await api.get("/password");
        if (!data.err) {
            setList(data.passwords)
        }
    }
    async function deletePassword(id) {
        Swal.fire({
            title: 'Are you sure?'+id,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DC4C64',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await api.delete("/password/"+id);
                if (!data.err) {
                    // Swal.fire(
                    //     {
                    //         title: 'Success',
                    //         text: "Password deleted successfull.",
                    //         icon: 'success',
                    //         confirmButtonColor: '#DC4C64'
                    //     }
                    // )
                    window.location.reload()
                } else {
                    Swal.fire(
                        {
                            title: 'Failed!',
                            text: "Password deletion failed",
                            icon: 'error',
                            confirmButtonColor: '#DC4C64'
                        }
                    )
                }
            }
        })

    }
    return (
        <>
            <Header></Header>
            <MDBContainer className=''>
                <MDBRow className=''>
                
                    <MDBContainer fluid>
                        <MDBRow>
                            <MDBCol md={6}>
                                <MDBBtn className='w-100 mt-2' color="danger" outline style={{ height: "50px" }} onClick={() => setShowGenerateModal(true)} >
                                    Generate Password
                                </MDBBtn>
                            </MDBCol>
                            <MDBCol md={6}>
                                <MDBBtn className='w-100 mt-2' color='danger' style={{ height: "50px" }} onClick={() => setShowAddModal(true)} >
                                    Add password
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBRow>
                <MDBRow className='mt-5'>
                    <h5>Saved Passwords</h5>
                </MDBRow>
                <MDBRow className='mt-3'>
                    {
                        list[0] &&
                        list.map((item, index) => {
                            return (
                                <MDBCol xl={6} key={index} className='mb-4'>
                                    <MDBCard>
                                        <MDBCardBody>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='d-flex align-items-center'>
                                                    <img src="https://lh4.googleusercontent.com/zxHGfDuP9OcnUCHnOaV77PUez3jUnliiGJr4GmdExFZxMe5X3nqG9R8qTcBFcknkQ_lxT-rtQS42jXWqWr9E-xMNv50ri-pFg-HdQi_MQ-j75jkYuf5KILd8RdG8SC4zp8FMqJME9_atihTsBujbVdQAj_jwd6I0Tc3XP0stjsW_AHxAuX-OED49xizrBA" style={{ height: 65 }} className="rounded-circle" />
                                                    <div className='ms-3'>
                                                        <p className='fw-bold mb-1'>{item.appName}</p>
                                                        <p className='text-muted mb-0'>{item.userName}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </MDBCardBody>
                                        <MDBCardFooter background='light' border='0' className='p-2 d-flex justify-content-around'>
                                            <MDBBtn color='link' rippleColor='primary' className='text-reset w-100' onClick={() => deletePassword(item._id)} >
                                                delete
                                                <MDBIcon fas icon='trash' className='ms-3' />
                                            </MDBBtn>
                                            <MDBBtn color='link' rippleColor='primary' onClick={() => {copyToClipboard(item.password); setOpen(true)}} className='text-reset m-0 w-100 text-danger'>
                                                Copy password <MDBIcon fas icon='clipboard' className='ms-3' />
                                            </MDBBtn>
                                        </MDBCardFooter>
                                    </MDBCard>
                                </MDBCol>

                            )
                        })
                    }
                </MDBRow>
            </MDBContainer>
            <Snackbar open={open} anchorOrigin={{ vertical:"bottom", horizontal:"center" }} autoHideDuration={2000} onClose={()=>{setOpen(false)}}>
                <Alert onClose={()=>{setOpen(false)}}  sx={{ width: '100%' }}>
                    Text copied successfully
                </Alert>
            </Snackbar>
            <AddPasswordModal setCopyOpen={setOpen} open={showAddModal} setOpen={setShowAddModal} />
            <GeneratePasswordModal setCopyOpen={setOpen} open={showGenerateModal} setOpen={setShowGenerateModal} />
        </>


    );
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });