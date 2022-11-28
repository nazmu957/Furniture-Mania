import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthProvider'

const SocialLogin = () => {
  const navigate = useNavigate()
  const { googleSignIn } = useContext(AuthContext)

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user
        console.log(user)

        saveSellerUser(user.displayName, user.email)
      })
      .catch((err) => console.error(err))
  }
  //adding google user data on database
  const saveSellerUser = (name, email) => {
    const sellerUser = { name, email }
    fetch('https://used-products-server.vercel.app/sellers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(sellerUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('saver user', data)
        getUserToken(email)
      })
  }

  const getUserToken = (email) => {
    fetch(`https://used-products-server.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken)
          navigate('/')
        }
      })
  }

  return (
    <div>
      <button onClick={handleGoogleSignIn} className="btn btn-ghost">
        Google
      </button>
    </div>
  )
}

export default SocialLogin
