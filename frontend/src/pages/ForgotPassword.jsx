import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../redux/userSlice';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const forgotFunc = () => {
        let res = dispatch(forgotPassword(email))
    }

  return (
    <div className='flex h-screen items-center justify-center text-center'>
        <div className='w-1/3'>
            
                <div className='text-2xl text-bold'>Şifremi Unuttum</div>
                <Input placeholder={"Email"} name={"email"} id={""} type={"text"} onChange={() =>{}}/>
                <Button text={"Onayla"} onClick={() => {forgotFunc()}}/>
            
        </div>
    </div>
  )
}

export default ForgotPassword