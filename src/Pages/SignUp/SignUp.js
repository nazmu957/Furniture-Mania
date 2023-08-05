import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider'
import useToken from '../../hooks/useToken'
import login from '../../assets/login.svg'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { createUser, updateUser } = useContext(AuthContext)
  const [signUpError, setSignUpError] = useState('')
  const [createdUserEmail, setCreatedUserEmail] = useState('')
  const [token] = useToken(createdUserEmail)
  const navigate = useNavigate()

  if (token) {
    navigate('/')
  }
  const handleSignUp = (data) => {
    console.log(data)
    setSignUpError('')
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user
        console.log(user)
        toast('New User Created')
        const userInfo = {
          displayName: data.name,
        }
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email, data.option)
          })
          .catch((err) => console.log(err))
      })
      .catch((error) => {
        console.log(error)
        setSignUpError(error.message)
      })
  }

  const saveUser = (name, email, option) => {
    const user = { name, email, option }
    fetch('https://used-products-server.vercel.app/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email)
      })
  }

  return (

    <div className="hero bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse ">
    <img src={login} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
            <div className="h-[800px] flex justify-center items-center bg-red-100">
       <div className="w-96 p-7">
         <h2 className="text-xl text-center">Sign Up</h2>
         <form onSubmit={handleSubmit(handleSignUp)}>
           <div className="form-control w-full max-w-xs">
             <label className="label">
               {' '}
               <span className="label-text">Name</span>
             </label>
             <input
              type="text"
              {...register('name', {
                required: 'Name is Required',
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {' '}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register('email', {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {' '}
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be 6 characters long',
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    'Password must have uppercase, number and special characters',
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {' '}
              <span className="label-text">User Options</span>
            </label>
            <select
              {...register('option')}
              className="select select-bordered w-full max-w-xs"
            >
              <option>Buyer</option>
              <option>Seller</option>
            </select>
          </div>

          <input
            className="btn btn-primary w-full mt-4"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p className="pt-3">
          Already have an account{' '}
          <Link className="text-secondary" to="/login">
            Please Login
          </Link>
        </p>
    
      </div>
    </div>       
    </div>
  </div>
</div>









   
  )
}

export default SignUp
