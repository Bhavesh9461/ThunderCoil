import React from 'react'
import { getAuthUser } from '../lib/api.js';
import { useQuery } from '@tanstack/react-query';

const useAuthUser = () => {
    // tanstack query
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // auth check if not then run only once and navigate to the login or signup page
  });

  return {isLoading: authUser.isLoading, authUser: authUser.data?.user}
}

export default useAuthUser