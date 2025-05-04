import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/Button'

const Profile = () => {
  const {user, isAuth} = useSelector(state => state.user)

  return (
    <div className='min-h-screen'>
        <div className='flex justify-center gap-5 my-10'>
        <div className=''>
            {
                <img className='w-[200px] h-[200px] rounded-full' src={user?.avatar?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s"} alt="" />
            }
        </div>
        <div className='space-y-2'>
            <div className='text-4xl font-bold'>{user.name}</div>
            <div className='text-2xl '>{user.email}</div>
            <Button text={"Profili Güncelle"}/>
        </div>
        </div>
    </div>
  )
}

export default Profile