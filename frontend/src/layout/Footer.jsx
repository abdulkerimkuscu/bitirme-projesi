import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white">Ana Sayfa</Link></li>
              <li><Link to="/products" className="hover:text-white">Ürünler</Link></li>
              <li><Link to="/cart" className="hover:text-white">Sepet</Link></li>
              <li><Link to="/profile" className="hover:text-white">Profil</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li>E-posta: info@example.com</li>
              <li>Telefon: (123) 456-7890</li>
              <li>Adres: Örnek Mahallesi, İstanbul</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bizi Takip Edin</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Instagram</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Mağazamız. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer