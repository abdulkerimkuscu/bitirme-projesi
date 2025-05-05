import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../redux/cartSlice';

const Cart = () => {
    const {carts} = useSelector(state => state.cart)
    const dispatch = useDispatch();

    console.log(carts, "Cartssssssss");
    const deleteItem = (id) => {
        dispatch(removeFromCart(id))
    }
  return (
    // componenetde card yapılacak
    <div className='h-screen'>
        {
            carts?.length > 0 ? 
            <div>
                {
                    carts?.map((cart,i) => (
                        <div className='flex items-center justify-between border-b mb-2 py-2' key={i}> 
                            <img className='w-[80px]' src={cart?.image?.url} alt="" />
                            <div>{cart?.name}</div>
                            <div>{cart?.price}</div>
                            <button onClick={() => {deleteItem(cart?.id)}} className='w-[100px] h-12 flex items-center justify-center rounded-md bg-red-500 text-white'>Sil</button>

                        </div>
                    ))
                }
            </div>
            : 
            <div>
              Sepette Ürün Bulunmamaktadır.  
            </div>
        }
    </div>
  )
}

export default Cart