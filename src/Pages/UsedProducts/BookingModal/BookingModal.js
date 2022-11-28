import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../../Context/AuthProvider'
import Login from '../../Login/Login'

const BookingModal = ({ productInfo, setProductInfo }) => {
  //console.log(productInfo);
  const { productName, resalePrice, img } = productInfo

  const { user } = useContext(AuthContext)

  const handleBooking = (event) => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const itemName = form.itemName.value
    const price = form.price.value
    const phoneNumber = form.phoneNumber.value
    const location = form.location.value

    const booking = {
      name,
      email,
      itemName,
      price,
      phoneNumber,
      location,
      img,
    }
    fetch('https://used-products-server.vercel.app/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.acknowledged) {
          setProductInfo(null)
          toast.success('Confirmed Booking successfully')
        }
        //error for double booking
        // else{
        //   toast.error(data.message);
        // }
      })

    //console.log(name,email,itemName,price,phoneNumber,location);
  }
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{productName}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              name="name"
              disabled
              type="text"
              defaultValue={user?.displayName}
              placeholder="User Name"
              className="input w-full input-bordered"
            />
            <input
              name="email"
              disabled
              type="email"
              defaultValue={user?.email}
              placeholder="Email Address"
              className="input w-full input-bordered"
            />
            <input
              name="itemName"
              disabled
              type="text"
              defaultValue={productName}
              placeholder="Item Name"
              className="input w-full input-bordered"
            />
            <input
              name="price"
              disabled
              type="text"
              defaultValue={resalePrice}
              placeholder="Price"
              className="input w-full input-bordered"
            />
            <input
              name="phoneNumber"
              type="text"
              required
              placeholder="Your Phone Number"
              className="input w-full input-bordered"
            />
            <input
              name="location"
              type="text"
              required
              placeholder="Meeting Location"
              className="input w-full input-bordered"
            />
            <br />
            <input
              className="btn btn-accent w-full "
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default BookingModal
