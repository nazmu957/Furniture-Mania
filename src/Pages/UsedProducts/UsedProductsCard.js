import React from 'react'

const UsedProductsCard = ({ category,setProductInfo }) => {
  const {
    _id,
    categoryName,
    productName,
    sellerName,
    yearsOfUse,
    img,
    resalePrice,
    originalPrice,
    location,
    postingTime,
  } = category
  return (
    <div>
      <div className="card w-96 bg-red-100 shadow-xl h-full">
        <figure className="px-10 pt-10 ">
          <img src={img} alt="Shoes" className="rounded-xl h-64" />
        </figure>
        <div className="card-body items-center text-center">
  <h2 className="card-title">{productName}</h2>
  <p>sellerName: {sellerName}</p>
  <p>Years Of Use: {yearsOfUse}</p>
  <p>resalePrice: {resalePrice}</p>
  <p>originalPrice: {originalPrice}</p>
  <p>location: {location}</p>
  <p>postingTime :{postingTime}</p>
          <div className="card-actions">
            
            <label onClick={() => setProductInfo(category)} htmlFor="booking-modal" className="btn btn-primary">Book Now</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsedProductsCard
