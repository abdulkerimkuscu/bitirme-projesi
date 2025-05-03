import React from 'react'

const Filter = ({setPrice, setCategory}) => {
    const categoryList = [
        "Çanta", "Saat", "Ayakkabı", "Pantolon", "Kamp Malzemeleri"
    ]
  return (
    <div className='w-[200px] mt-4'>
        <div>Fiyat</div>
        <div className='flex items-center gap-2 my-2'>
            <input onChange={e => setPrice (prev => ({...prev, min: e.target.value}))} className='border w-20 p-1 outline-none' type="number" placeholder='Min' />
            <input onChange={e => setPrice (prev => ({...prev, min: e.target.value}))} className='border w-20 p-1 outline-none' type="number" placeholder='Max' />
        </div>
        <div className='my-2'>Kategori</div>
        <div>
            {categoryList.map((category,i) => (
                <div onClick={()  => setCategory(category)} key={i} className='text-sm cursor-pointer'>{category}</div>
            ))}
        </div>
    </div>
  )
}

export default Filter