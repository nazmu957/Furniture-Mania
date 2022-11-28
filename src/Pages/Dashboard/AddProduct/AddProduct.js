import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Shared/Loading/Loading'

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const imageHostKey = process.env.REACT_APP_imgbb_key

  const navigate = useNavigate()
  //console.log(imageHostKey);
  const { data: conditions, isLoading } = useQuery({
    queryKey: ['condition'],
    queryFn: async () => {
      const res = await fetch(
        'https://used-products-server.vercel.app/conditionType',
      )
      const data = await res.json()
      return data
    },
  })

  const handleAddProduct = (data) => {
    const image = data.image[0]
    const formData = new FormData()
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          // console.log(imgData.data.url);
          const product = {
            productName: data.name,
            productPrice: data.price,
            phoneNumber: data.phone,
            location: data.location,
            description: data.description,
            years: data.years,
            conditions: data.condition,
            image: imgData.data.url,
          }

          // save product information on database
          fetch('https://used-products-server.vercel.app/products', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result)
              toast.success(`${data.name} is added successfully`)
              navigate('/dashboard/myproducts')
            })
        }
      })
  }

  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <div className="w-96 p-7">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            {' '}
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            {...register('name', {
              required: 'Name is Required',
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            {' '}
            <span className="label-text">Product Price</span>
          </label>
          <input
            type="text"
            {...register('price', {
              required: 'Price is Required',
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            {' '}
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="text"
            {...register('phone', {
              required: 'Phone  is Required',
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            {' '}
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            {...register('location', {
              required: 'location  is Required',
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            {' '}
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register('description')}
            className="textarea textarea-bordered"
            placeholder="description"
          ></textarea>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            {' '}
            <span className="label-text">Year Of Purchase</span>
          </label>
          <input
            type="text"
            {...register('years', {
              required: 'years  is Required',
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.years && (
            <p className="text-red-500">{errors.years.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            {' '}
            <span className="label-text">Product Condition</span>
          </label>
          <select
            {...register('condition')}
            className="select select-bordered w-full max-w-xs"
          >
            {conditions?.map((condition) => (
              <option key={condition._id} value={condition.condition}>
                {condition.condition}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            {' '}
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register('image', {
              required: 'Photo is Required',
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.img && <p className="text-red-500">{errors.img.message}</p>}
        </div>

        <input
          className="btn btn-accent w-full mt-4"
          value="Add Product"
          type="submit"
        />
      </form>
    </div>
  )
}

export default AddProduct
