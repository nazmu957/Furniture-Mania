import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthProvider'

const MyOrders = () => {
  const { user } = useContext(AuthContext)
  //console.log(user);
  const url = `https://used-products-server.vercel.app/bookings?email=${user?.email}`

  const { data: bookings = [] } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      const data = await res.json()
      return data
    },
  })
  return (
    <div>
      <h2 className='text-center py-5 font-bold'>Orders List</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Title</th>
              <th>Price</th>
              <th>Payment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings?.map((booking, i) => (
                <tr key={booking._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask rounded w-12 h-12">
                          <img src={booking.img} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{booking.itemName}</td>
                  <td>{booking.price}</td>
                  <th>
                    {booking.price && !booking.paid && (
                      <Link to={`/dashboard/payment/${booking._id}`}>
                        <button className="btn btn-sm btn-primary">Pay</button>
                      </Link>
                    )}
                    {booking.price && booking.paid && (
                      <span className="text-green-500">Paid</span>
                    )}
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyOrders
