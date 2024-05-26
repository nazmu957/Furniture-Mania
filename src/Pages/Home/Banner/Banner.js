import React from 'react'
import banner3 from '../../../assets/banner3.jpg'

const Banner = () => {
  return (
    <div>
      <div className="carousel w-full mt-2 rounded">
        <div id="item1" className="carousel-item w-full">
          <img src={banner3} className="w-full" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src={banner3} className="w-full" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img src={banner3} className="w-full" />
        </div>
      </div>
      <div className="flex justify-center w-full py-5 gap-2">
        <a href="#item1" className="btn bg-white text-secondary btn-xs">
          1
        </a>
        <a href="#item2" className="btn  bg-white text-secondary btn-xs">
          2
        </a>
        <a href="#item3" className="btn  bg-white text-secondary btn-xs">
          3
        </a>
      </div>
    </div>
  )
}

export default Banner
