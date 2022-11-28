import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal'
import Loading from '../../Shared/Loading/Loading'

const MyProducts = () => {
  const [deletingProduct, setDeletingProduct] = useState(null)

  const closeModal = () => {
    setDeletingProduct(null)
  }

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const res = await fetch(
          'https://used-products-server.vercel.app/products',
          {
            headers: {
              authorization: `bearer ${localStorage.getItem('accessToken')}`,
            },
          },
        )
        const data = await res.json()
        return data
      } catch (error) {}
    },
  })

  const handleDeleteProduct = (product) => {
    fetch(`https://used-products-server.vercel.app/products/${product._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch()
          toast.success(`Product ${product.name} deleted Successfully`)
        }
      })
  }

  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <div key={product._id} className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={product.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.productName}
                <div className="badge badge-secondary">Available/sold</div>
              </h2>
              <p>Product Price:${product.productPrice}</p>
              <div className="card-actions justify-end">
                <label
                  onClick={() => setDeletingProduct(product)}
                  htmlFor="confirmation-modal"
                  className="btn btn-sm btn-error"
                >
                  Delete
                </label>
                <div className="badge badge-outline">Addvertice</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {deletingProduct && (
        <ConfirmModal
          title={`Are you confirm to delete this product?`}
          message={`If you delete ${deletingProduct.name}.It will never recover`}
          successAction={handleDeleteProduct}
          successButtonName="Delete"
          modalData={deletingProduct}
          closeModal={closeModal}
        ></ConfirmModal>
      )}
    </div>
  )
}

export default MyProducts
