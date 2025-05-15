import React, { useState, useEffect, useRef } from 'react';
import { LuShoppingBasket, LuSearch, LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getKeyword } from '../redux/generalSlice';
import { logoutUser } from '../redux/userSlice';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuth } = useSelector(state => state.user);
  const { carts } = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const menuItems = [
    {
      name: "Profil",
      url: "/profile"
    },
    {
      name: "Admin",
      url: "/admin",
      adminOnly: true
    },
    {
      name: "Çıkış",
      url: "/logout"
    },
  ].filter(item => !item.adminOnly || (item.adminOnly && user?.role === 'admin'));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const keywordFunc = () => {
    if (keyword.trim()) {
      dispatch(getKeyword(keyword));
      setKeyword("");
      setIsSearchOpen(false);
      navigate("/products");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      keywordFunc();
    }
  };

  const menuFunc = async (item) => {
    if (item.name === "Çıkış") {
      if (!isAuth) return;

      try {
        await fetch("http://localhost:4000/logout", {
          method: "GET",
          credentials: "include"
        });
        localStorage.clear();
        dispatch(logoutUser());

        if (window.location.pathname !== "/") {
          navigate("/");
        }
      } catch (err) {
        console.error("Çıkış sırasında hata:", err);
      }
    } else if (item.name === "Profil" && !isAuth) {
      navigate("/auth");
    } else {
      navigate(item.url);
    }
    setOpenMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
              Ticaret
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-gray-100 rounded-full overflow-hidden hover:bg-gray-200 transition-colors">
                <input
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-64 px-4 py-2 bg-transparent outline-none"
                  type="text"
                  placeholder="Ürün ara..."
                />
                <button
                  onClick={keywordFunc}
                  className="p-2 hover:bg-gray-300 transition-colors"
                  aria-label="Ara"
                >
                  <LuSearch className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* User Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center focus:outline-none"
              >
                <img
                  className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-orange-500 transition-colors"
                  src={user?.avatar?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s"}
                  alt="Profil"
                />
              </button>

              {/* Dropdown Menu */}
              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                  {menuItems.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => menuFunc(item)}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Sepet"
            >
              <LuShoppingBasket className="w-6 h-6 text-gray-700" />
              {carts?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center">
                  {carts?.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <LuSearch className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <LuShoppingBasket className="w-5 h-5" />
              {carts?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center">
                  {carts?.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <LuMenu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-4">
            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
              <input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 bg-transparent outline-none"
                type="text"
                placeholder="Ürün ara..."
              />
              <button
                onClick={keywordFunc}
                className="p-2 hover:bg-gray-300 transition-colors"
              >
                <LuSearch className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {openMenu && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2">
              {menuItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => menuFunc(item)}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;