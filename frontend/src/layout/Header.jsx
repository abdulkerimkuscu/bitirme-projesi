import React, { useState } from 'react'
import { LuShoppingBasket } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getKeyword } from '../redux/generalSlice';
import { logoutUser } from '../redux/userSlice';



const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { user, isAuth } = useSelector(state => state.user)
  const { carts } = useSelector(state => state.cart)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const menuItem = [
    {
      name: "Profil",
      url: "/profile"
    },

    {
      name: "Admin",
      url: "/admin"
    },
    {
      name: "Çıkış",
      url: "/logout"
    },
  ]

  const keywordFunc = () => {
    dispatch(getKeyword(keyword));
    setKeyword("")
    navigate("/products")
  }


  const menuFunc = async (item) => {
    // Kullanıcı çıkış yapmak istiyor ama zaten çıkış yapmışsa hiçbir şey yapma
    if (item.name === "Çıkış") {
      if (!isAuth) return;
  
      try {
        await fetch("http://localhost:4000/logout", {
          method: "GET",
          credentials: "include"
        });
        localStorage.clear();
        dispatch(logoutUser());
  
        // Anasayfaya yönlendir
        if (window.location.pathname !== "/") {
          navigate("/");

        }
  
      } catch (err) {
        console.error("Çıkış sırasında hata:", err);
      }
    } 
    // Kullanıcı profil'e gitmek istiyor ama login değilse -> auth'a gönder
    else if (item.name === "Profil" && !isAuth) {
      navigate("/auth");
    } 
    // Diğer her şey normal yönlendirilsin
    else {
      navigate(item.url);
    }
  };
  
  

  return (
    <div className='bg-orange-100 h-16 px-5 flex items-center justify-between '>
      <div className='text-3xl'>
        Ticaret
      </div>
      <div className='flex items-center gap-5'>
        <div className='flex items-center'>
          <input value={keyword} onChange={e => setKeyword(e.target.value)} className="p2 outline-none" type="text" placeholder='Arama Yap' />
          <button onClick={keywordFunc} className='p2 ml-1 bg-white cursor pointer'>Ara</button>
        </div>
        <div className='relative'>
          <img onClick={() => { setOpenMenu(!openMenu) }} className='w-8 h-8 rounded-full' src={user ? user?.avatar?.url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s"} />
          {openMenu && <div className='absolute rigth-0 mt-3 w-[100px] bg-white shadow-lg shadow-green-600'>
            {menuItem.map((item, i) => (
              <button onClick={() => menuFunc(item)} className='px-2 py-1 ' key={i}>{item.name}</button>
            ))}
          </div>}
        </div>
        <div onClick={() => { navigate("/cart") }} className='relative'>
          <LuShoppingBasket size={30} />
          <div className='absolute -top-2 -rigth-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center'> {carts?.length} </div>
        </div>
      </div>
    </div>
  )
}

export default Header