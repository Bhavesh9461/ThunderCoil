import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { login } from '../lib/api.js'
import toast from 'react-hot-toast'
import { CloudLightning } from 'lucide-react'
import { Link } from 'react-router'
import useLogin from '../hooks/useLogin.js'

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  /**
   * @description before seperate this hook code was below 
   */
  // const queryClient = useQueryClient()

  // const {mutate:loginMutation, isPending, error} = useMutation({
  //   mutationKey: ["login"],
  //   mutationFn: login,
  //   onSuccess: ()=> {
  //     toast.success("LogIn successfull.")
  //     queryClient.invalidateQueries({ queryKey: ["authUser"]})
  //   }
  // })
  
  const {isPending,error,loginMutation} = useLogin()

  const handleLogin = (e)=>{
    e.preventDefault()
    loginMutation(loginData)
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="lemonade">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

        {/* LOGIN FORM SECTION : LEFT SIDE */}
        <div className='w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col'>
          {/* LOGO */}
          <div className='mb-4 flex items-center justify-start gap-2'>
              <CloudLightning className='size-9 text-primary' />
              <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-wider '>
                ThunderCoil
              </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className='w-full'>
            <form onSubmit={handleLogin}>

              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>Welcome Back</h2>
                  <p className='text-sm opacity-70'>
                    Sign in to your account to continue your friendships
                  </p>
                </div>

                <div className='flex flex-col gap-3'>

                  {/* EMAIL */}
                  <div className="form-control w-full space-y-2">
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input 
                      type="email" 
                      placeholder='john@gmail.com'
                      value={loginData.email}
                      onChange={(e)=>{
                        setLoginData({...loginData, email: e.target.value})
                      }}
                      className='input input-bordered w-full'
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="form-control w-full space-y-2">
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input 
                      type="password" 
                      placeholder='*******'
                      value={loginData.password}
                      onChange={(e)=>{
                        setLoginData({...loginData, password: e.target.value})
                      }}
                      className='input input-bordered w-full'
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        <span className='loading loading-spinner loading-xs'></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* Switch between login and signup */}
                  <div className='text-center mt-4'>
                    <p className='text-sm'>
                      Don't have an account?{" "}
                      <Link to="/signup" className='text-primary hover:underline'>
                        Create one
                      </Link>
                    </p>
                  </div>

                </div>
                
              </div>

            </form>
          </div>

        </div>

        {/* LOGIN FORM SECTION : RIGHT SIDE || IMAGE ILLUSTRATION */}
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
            <div className='max-w-md p-8'>
              {/* Image */}
              <div className='relative aspect-square max-w-sm mx-auto'>
                  <img className='w-full h-full' src="./i.png" alt="Connection Illustration" />
              </div>

              <div className='text-center space-y-3 mt-6'>
                <h2 className='text-xl font-semibold'>Connect with friends in all region</h2>
                <p className='opacity-70'>
                  Create conversations, make friends and improve your skills together
                </p>
              </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default LoginPage