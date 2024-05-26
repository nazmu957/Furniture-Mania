import React from 'react'
import singleSofa from '../../../assets/products/single-sofa.jpg'

import { Link } from 'react-router-dom'

const SingleReview = () => {
  return (
    
    <div className="hero ">
      <img  alt=""/>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center">
    <div className="text-white">
      <h1 className="mb-5  text-[1.5rem] lg:text-[3.5rem]">Are You Looking for Used Furniture?</h1>
      <p className="mb-5">
We've delivered quality furniture to more than half a million North American homes and businesses. Article is staffed by engineers, journalists, painters, weight lifters, slack-liners, mountain bikers, chefs, reiki masters, and more.</p>
      <Link to="/blog"><button className="btn btn-primary">Learn more</button></Link>
    </div>
  </div>
</div>
  )
}

export default SingleReview
