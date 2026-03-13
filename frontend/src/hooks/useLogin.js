import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { login } from '../lib/api.js'

const useLogin = () => {
  const queryClient = useQueryClient()
  
    const {mutate, isPending, error} = useMutation({
      mutationKey: ["login"],
      mutationFn: login,
      onSuccess: ()=> {
        toast.success("LogIn successfull.")
        queryClient.invalidateQueries({ queryKey: ["authUser"]})
        queryClient.invalidateQueries({ queryKey: ["friends"] })
      }
    })

    return {isPending,error, loginMutation:mutate}
}

export default useLogin