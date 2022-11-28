import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider'
import { GoogleAuthProvider } from 'firebase/auth'
import useToken from '../../hooks/useToken'
import SocialLogin from '../Shared/SocialLogin/SocialLogin'
import login from '../../assets/login.svg'

const Login = () => {
  const { providerLogin } = useContext(AuthContext)
  const googleProvider = new GoogleAuthProvider()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const { signIn } = useContext(AuthContext)
  const [loginError, setLoginError] = useState('')
  const [loginUserEmail, setLoginUserEmail] = useState('')
  const [token] = useToken(loginUserEmail)
  const location = useLocation()
  const navigate = useNavigate()

  const from = location.state?.from?.pathname || '/'

  if (token) {
    navigate(from, { replace: true })
  }

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user
        console.log(user)

        saveBuyerUser(user.displayName, user.email)
        //navigate(from, {replace: true})
      })
      .catch((error) => console.error(error))
  }

  //adding google user data on database
  const saveBuyerUser = (name, email) => {
    const buyerUser = { name, email }
    fetch('https://used-products-server.vercel.app/buyers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(buyerUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoginUserEmail(email)
        navigate('/')
      })
  }

  const handleLogin = (data) => {
    console.log(data)
    setLoginError('')
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user
        console.log(user)
        setLoginUserEmail(data.email)
      })
      .catch((error) => {
        console.log(error.message)
        setLoginError(error.message)
      })
  }
  return (
    <div className="hero  bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={login} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
            <div className="h-[800px] flex justify-center items-center bg-red-100  ">
      <div className="w-96 p-7 py-10">
         <h2 className="text-xl text-center">Login</h2>
         <form onSubmit={handleSubmit(handleLogin)}>
           <div className="form-control w-full max-w-xs">
             <label className="label">
               {' '}
               <span className="label-text">Email</span>
             </label>
             <input
              type="text"
              {...register('email', {
                required: 'Email Address is required',
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
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
                  message: 'Password must be 6 characters or longer',
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              {' '}
              <strong><span className="label-text">Seller/Buyer/Admin Login With Email</span></strong>
            </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <input
            className="btn btn-primary w-full"
            value="Login"
            type="submit"
          />
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
        </form>
        <p>
          New to Furniture Mania{' '}
          <Link className="text-secondary" to="/signup">
            Create new Account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignIn} className="btn btn-primary w-full">
          CONTINUE WITH GOOGLE
        </button>
        
      </div>
    </div>
    </div>
  </div>
</div>
    
  )
}

export default Login
