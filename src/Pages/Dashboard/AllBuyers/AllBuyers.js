import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal'
import Loading from '../../Shared/Loading/Loading'

const AllBuyers = () => {
  const [deletingUser, setDeletingUser] = useState(null)

  const closeModal = () => {
    setDeletingUser(null)
  }

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const res = await fetch(
          'https://used-products-server.vercel.app/users',
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

  const handleDeleteUser = (user) => {
    fetch(`https://used-products-server.vercel.app/users/${user._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch()
          toast.success(`User ${user.name} deleted Successfully`)
        }
      })
  }

  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <div>
      <h2>All Buyers</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {' '}
                  <label
                    onClick={() => setDeletingUser(user)}
                    htmlFor="confirmation-modal"
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingUser && (
        <ConfirmModal
          title={`Are you confirm to delete this product?`}
          message={`If you delete ${deletingUser.name}.It will never recover`}
          successAction={handleDeleteUser}
          successButtonName="Delete"
          modalData={deletingUser}
          closeModal={closeModal}
        ></ConfirmModal>
      )}
    </div>
  )
}

export default AllBuyers
