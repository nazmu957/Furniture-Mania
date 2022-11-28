import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import BookingModal from './BookingModal/BookingModal'
import UsedProductsCard from './UsedProductsCard'

const UsedProducts = () => {
   const { categoryName, categoryList } = useLoaderData()
  const [productInfo, setProductInfo] = useState(null)
  console.log(categoryList)



  return (
    <div>
      <h2 className='text-center text-3xl py-5 font-semibold'> You Select  {categoryName} </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 mb-10">
        {categoryList.map((category) => (
          <UsedProductsCard
            key={category.service_id}
            category={category}
            setProductInfo={setProductInfo}
          ></UsedProductsCard>
        ))}
      </div>
      {productInfo && <BookingModal productInfo={productInfo} setProductInfo={setProductInfo} ></BookingModal>}
    </div>
  )
}

export default UsedProducts
