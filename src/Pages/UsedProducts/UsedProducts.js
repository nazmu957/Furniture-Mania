import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import BookingModal from './BookingModal/BookingModal'
import UsedProductsCard from './UsedProductsCard'

const UsedProducts = () => {
   const { categoryName, categoryList } = useLoaderData()
  const [productInfo, setProductInfo] = useState(null)
  console.log(categoryList)

  // const {categoryList = []} =  useQuery({
  //   queryKey: ['categoryList'],
  //   queryFn: () => fetch(``)
  //   .then( res => res.json())
  // });

  return (
    <div>
      <h2> Name: {categoryName} </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
