import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import { MdEmail, MdPerson, MdShoppingBag, MdStar } from 'react-icons/md'

const Profile = () => {
  const {user, isAuth} = useSelector(state => state.user)

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Profile Card */}
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
          {/* Cover Image */}
          <div className='h-32 bg-gradient-to-r from-orange-400 to-orange-600'></div>
          
          {/* Profile Content */}
          <div className='relative px-4 sm:px-6 pb-8'>
            {/* Avatar */}
            <div className='relative -mt-16 mb-8 flex justify-center'>
              <div className='relative'>
                <img 
                  className='w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover'
                  src={user?.avatar?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s"}
                  alt={user?.name || "Profile"} 
                />
                <div className='absolute inset-0 rounded-full shadow-inner'></div>
              </div>
            </div>

            {/* User Info */}
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-gray-900 mb-1'>{user?.name}</h1>
              <div className='flex items-center justify-center text-gray-600 space-x-2'>
                <MdEmail className="w-5 h-5" />
                <span>{user?.email}</span>
              </div>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>0</div>
                <div className='text-sm text-gray-600'>Siparişler</div>
              </div>
              <div className='text-center border-l border-r border-gray-200'>
                <div className='text-2xl font-bold text-gray-900'>0</div>
                <div className='text-sm text-gray-600'>İncelemeler</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>0</div>
                <div className='text-sm text-gray-600'>Favoriler</div>
              </div>
            </div>

            {/* Actions */}
            <div className='mt-6 flex flex-col sm:flex-row gap-3 justify-center'>
              <Button 
                text="Profili Güncelle"
                onClick={() => {}}
                className="flex-1 max-w-[200px]"
              />
              <Button 
                text="Şifre Değiştir"
                onClick={() => {}}
                className="flex-1 max-w-[200px]"
              />
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Recent Orders */}
          <div className='bg-white rounded-xl shadow-md p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <MdShoppingBag className="w-6 h-6 text-orange-500" />
              Son Siparişler
            </h2>
            <div className='text-gray-600 text-center py-8'>
              Henüz sipariş bulunmamaktadır.
            </div>
          </div>

          {/* Recent Reviews */}
          <div className='bg-white rounded-xl shadow-md p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <MdStar className="w-6 h-6 text-orange-500" />
              Son İncelemeler
            </h2>
            <div className='text-gray-600 text-center py-8'>
              Henüz inceleme bulunmamaktadır.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile