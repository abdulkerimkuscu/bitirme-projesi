import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../redux/userSlice';

const ResetPassword = () => {
    const [password, setPassword]= useState("");
    const dispatch = useDispatch;
    const {token} = useParams();

    const forgotFunc = () => {
        let res = dispatch(resetPassword({token, password}))
    }

    return (
        <div className='flex h-screen items-center justify-center text-center'>
            <div className='w-1/3'>

                <div className='text-2xl text-bold'> Yeni Şifre Oluştur</div>
                <Input placeholder={"Yeni Şifre"} name={"password"} id={""} type={"password"} onChange={() => { }} />
                <Button text={"Onayla"} onClick={() => {forgotFunc() }} />

            </div>
        </div>
    )
}

export default ResetPassword