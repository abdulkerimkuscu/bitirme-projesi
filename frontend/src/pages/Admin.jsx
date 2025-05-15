import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addAdminProducts, getAdminProducts, deleteProduct, updateProduct } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button'
import { openModalFunc } from '../redux/generalSlice';
import Modal from '../components/Modal';
import Input from '../components/Input'


const Admin = () => {
  const dispatch = useDispatch();
  const { adminProducts, loading } = useSelector(state => state.products)
  const { openModal } = useSelector(state => state.general)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [data, setData] = useState({ name: "", description: "", rating: null, price: null, stock: null, category: "", images: [], })

  useEffect(() => {
    dispatch(getAdminProducts())
  }, [dispatch])

  const resetForm = () => {
    setData({ 
      name: "", 
      description: "", 
      rating: null, 
      price: null, 
      stock: null, 
      category: "", 
      images: [], 
    })
    setIsEditing(false)
    setEditingId(null)
  }

  const addProduct = () => {
    resetForm()
    dispatch(openModalFunc())
  }

  const handleEdit = (product) => {
    setData({
      name: product.name,
      description: product.description,
      rating: product.rating,
      price: product.price,
      stock: product.stock,
      category: product.category,
      images: []
    })
    setIsEditing(true)
    setEditingId(product._id)
    dispatch(openModalFunc())
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      await dispatch(deleteProduct(id))
      dispatch(getAdminProducts())
    }
  }

  const productHandle = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
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
      const numericValue = Math.max(0, Number(value));
      setData(prev => ({ ...prev, [name]: numericValue }));
    }
    else {
      setData(prev => ({ ...prev, [name]: value }))
    }
  }

  const modalFunc = async () => {
    if (isEditing) {
      await dispatch(updateProduct({ id: editingId, data }))
    } else {
      await dispatch(addAdminProducts(data))
    }
    dispatch(openModalFunc())
    dispatch(getAdminProducts())
    resetForm()
  }

  const content = (
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
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div>
          {adminProducts?.products && (
            <div className='flex items-center justify-center gap-5 my-5 flex-wrap'>
              {adminProducts.products.map((product, i) => (
                <ProductCard 
                  key={i}
                  edit={true} 
                  product={product}
                  onEdit={() => handleEdit(product)}
                  onDelete={() => handleDelete(product._id)}
                />
              ))}
            </div>
          )}
          {openModal && (
            <Modal 
              title={isEditing ? "Ürün Düzenle" : "Ürün Ekle"} 
              content={content} 
              onClick={modalFunc} 
              btnName={isEditing ? "Güncelle" : "Ekle"} 
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Admin