import { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard'

const Category = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://used-products-server.vercel.app/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
  }, [])

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-3 py-14">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  )
}

export default Category
