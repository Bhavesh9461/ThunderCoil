import { LoaderIcon, PlugZap } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center relative'>
       {/* <LoaderIcon className="animate-spin size-10 text-primary" /> */}
       <PlugZap className="animate-ping size-12 text-primary" />
       <PlugZap className="animate-pulse size-14 text-primary/70 absolute" />
    </div>
  )
}

export default PageLoader