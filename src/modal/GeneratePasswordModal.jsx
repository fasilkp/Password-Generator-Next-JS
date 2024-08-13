'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBRow,
    MDBInput,
    MDBRange,
    MDBSwitch,
    MDBClientOnly,
} from 'mdb-react-ui-kit';
import generatePassword from '../_lib/generatePassword';
import copyToClipboard from '../_lib/copyToClipboard';

export default function GeneratePasswordModal({ open, setOpen, setCopyOpen }) {
    const toggleShow = () => setOpen(!open);
    const [password, setPassword] = useState('')
    const [appName, setAppName] = useState("")
    const [refresh, setRefresh] = useState(true)
    const [option, setoption] = useState({
        upperCase: true,
        numbers: true,
        symbols: false
    })
    const [length, setLength] = useState(8)
    useEffect(() => {
        try {
            let newPassword = generatePassword(option, length)
            setPassword(newPassword)

        } catch (err) {
            console.log(err)
        }
    }, [option, open, length, refresh])
    const handleLengthChange = ((e) => {
        setLength(e.target.value)
    })

    return (
        <MDBClientOnly>
            <MDBModal tabIndex='-1' open={open}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Generate Password</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>

                        <MDBModalBody>
                            <MDBRow className='ps-2 pe-2 mt-3'>
                                <MDBInput label='Generated password' readOnly value={password} onChange={(e) => setPassword(e.target.value)} id='form1' type='text' size='lg' />
                            </MDBRow>
                            
                            <MDBRow className='mt-4'>
                                <div className='d-flex justify-content-between flex-row align-items-center'>
                                    <span>Length</span>
                                    <div className="badge badge-primary p-3 rounded-5">{length}</div>
                                </div>
                                <MDBRange
                                    defaultValue={length}
                                    min='5'
                                    max='64'
                                    step='1'
                                    onChange={handleLengthChange}
                                    value={length}
                                    id='customRange3'
                                    className='mt-2'
                                    label=''
                                />
                            </MDBRow>
                            <MDBRow className='mt-3'>
                                <div className='d-flex justify-content-between flex-row'>
                                    <label htmlFor='numberCheck'>Include Numbers</label>
                                    <MDBSwitch checked={option.numbers} color='danger' onChange={(e) => setoption({ ...option, numbers: e.target.checked })} />
                                </div>
                            </MDBRow>
                            <MDBRow className='mt-3'>
                                <div className='d-flex justify-content-between flex-row'>
                                    <label htmlFor='capCheck'>Incluse Uppercase letters</label>
                                    <MDBSwitch checked={option.upperCase} color='danger' onChange={(e) => setoption({ ...option, upperCase: e.target.checked })} />
                                </div>
                            </MDBRow>
                            <MDBRow className='mt-3'>
                                <div className='d-flex justify-content-between flex-row'>
                                    <label htmlFor='sympolCheck'>Include Symbols</label>
                                    <MDBSwitch checked={option.symbols} color='danger' onChange={(e) => setoption({ ...option, symbols: e.target.checked })} />
                                </div>
                            </MDBRow>
                            <MDBRow className='mt-3 ps-2 pe-2'>
                                <MDBBtn color='danger' outline className='w-100' onClick={() => setRefresh(!refresh)} >
                                    Generate new
                                </MDBBtn>
                            </MDBRow>


                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='danger' outline onClick={toggleShow} rounded>
                                Close
                            </MDBBtn>
                            <MDBBtn color='danger' onClick={() => { copyToClipboard(password); setCopyOpen(true) }} rounded>Copy to Clipboard</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </MDBClientOnly>
    );
}