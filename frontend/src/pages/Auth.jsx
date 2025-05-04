import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useDispatch } from 'react-redux'
import { login, register } from '../redux/userSlice'
const Auth = () => {
    const [signUp, setSignUp] = useState(true)
    const dispatch = useDispatch()
    const [data, setData] = useState({ name: "", email: "", password: "", avatar: "" })
    const [preview, setPreview] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s")

    const registerFunc = () => {
        dispatch(register(data))
    }

    const loginFunc = () => {
        dispatch(login(data))

    }
    const handleChange = (e) => {
        if (e.target.name == "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setData(prev => ({...prev, avatar: reader.result}))
                    setPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setData(prev => ({...prev, [e.target.name]: e.target.value}) )
        }
    }

  
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='w-1/3 -myt-10 border p-2 text-center rounded-md   '>
                <div className='text-2xl'>{signUp ? "Kayıt Ol" : "Giriş Yap"}</div>
                {signUp && <Input onChange={handleChange} value={data.name} type={"text"} name={"name"} id={""} placeholder={"Ad-Soyad"} />}
                <Input onChange={handleChange} value={data.email} type={"text"} name={"email"} id={""} placeholder={"Email"} />
                <Input onChange={handleChange} value={data.password} type={"password"} name={"password"} id={""} placeholder={"Şifre"} />
                {signUp && <div className='flex items-center gap-2'>
                    <img className='w-10 h-10 rounded-full' src={preview} alt="" />
                    <Input onChange={handleChange} type={"file"} name={"avatar"} id={""} placeholder={""} />
                </div>}
                <Button onClick={() => setSignUp(!signUp)}text={signUp ? "Giriş Yap" : "Kayıt Ol"}/>
                <Button text={signUp ? "Kayıt Ol" : "Giriş Yap"} onClick={signUp ? registerFunc : loginFunc} />

            </div>
        </div>
    )
}

export default Auth