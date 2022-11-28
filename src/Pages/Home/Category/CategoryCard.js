import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  const { _id, categoryName, condition } = category
  return (
    <div className="card w-96 bg-red-100 shadow-xl py-5">
      <div className="card-body">
        <h2 className="card-title">
          {categoryName}
          <div className="badge badge-secondary">{condition}</div>
        </h2>

        <div className="card-actions py-3">
          <div className="badge badge-outline">Top Rated</div>
          <div className="badge badge-outline">BestSeller</div>
        </div>
        <div>
          <div className='pt-5'>
            <Link  to={`/category/${_id}`}>
            <button className="btn btn-sm btn-active btn-primary font-bold ">
              Buy Now
            </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
