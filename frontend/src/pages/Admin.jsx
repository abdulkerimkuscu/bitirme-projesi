import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addAdminProducts, getAdminProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button'
import { openModalFunc } from '../redux/generalSlice';
import Modal from '../components/Modal';
import Input from '../components/Input'


const Admin = () => {
  const dispatch = useDispatch();
  const { adminProducts, loading } = useSelector(state => state.products)
  const { openModal } = useSelector(state => state.general)
  const [data, setData] = useState({ name: "", description: "", rating: null, price: null, stock: null, category: "", images: [], })

  useEffect(() => {
    dispatch(getAdminProducts())
  }, [dispatch])

  const addProduct = () => {
    dispatch(openModalFunc())
  }

  const productHandle = (e) => {
    const { name, value } = e.target;
    if (name == "images") {
      const files = Array.from(e.target.files);

      const imagesArray = [];

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            imagesArray.push(reader.result);
            setData(prev => ({ ...prev, images: imagesArray }))
          }
        }
        reader.readAsDataURL(file)
      })

    }
    else if (name === "price" || name === "stock") {
      // Fiyat veya stok alanına negatif değer girilmesini engelle
      const numericValue = Math.max(0, Number(value));
      setData(prev => ({ ...prev, [name]: numericValue }));
    }
    else {
      setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const modalAddFunc = () => {
    dispatch(addAdminProducts(data))
    dispatch(openModalFunc())
  }

  const content = (
    // ürün kategorisine dropdown yapılabilir
    <div>
      <Input onChange={productHandle} placeholder={"Ürün Adı"} value={data.name} name={"name"} id={""} type={"text"} />
      <Input onChange={productHandle} placeholder={"Ürün Açıklaması"} value={data.description} name={"description"} id={""} type={"text"} />
      <Input onChange={productHandle} placeholder={"Ürün Fiyatı"} value={data.price} name={"price"} id={""} type={"number"} />
      <Input onChange={productHandle} placeholder={"Ürün Stoğu"} value={data.stock} name={"stock"} id={""} type={"number"} />
      <Input onChange={productHandle} placeholder={"Ürün Kategorisi"} value={data.category} name={"category"} id={""} type={"text"} />
      <Input onChange={productHandle} placeholder={"Ürün Puanlama"} value={data.rating} name={"rating"} id={""} type={"number"} />
      <Input onChange={productHandle} name={"images"} id={""} type={"file"} />

    </div>
  )

  return (
    <div className='min-h-screen'>
      <Button text={"Ürün Ekle"} onClick={addProduct} />
      {
        loading ? "Loading..." : <div>
          {
            adminProducts?.products && <div className='flex items-center justify-center gap-5 my-5 flex-wrap'>
              {
                adminProducts?.products?.map((product, i) => (
                  <ProductCard edit={true} product={product} key={i} />
                ))
              }
            </div>
          }
          {openModal && <Modal title={"Ürün Ekle"} content={content} onClick={modalAddFunc} btnName={"Ürün Ekle"} />}
        </div>
      }

    </div>
  )
}

export default Admin