import { PlugZap } from 'lucide-react'
import React from 'react'
import { useThemeStore } from '../store/useThemeStore.js'

const ChatLoader = () => {

   const {theme} = useThemeStore()

  return (
    <div className='h-[90vh] flex flex-col items-center justify-center p-4 relative' data-theme={theme}>
       {/* <LoaderIcon className="animate-spin size-10 text-primary" /> */}
       <PlugZap className="animate-ping size-12 text-primary mb-6" />
       <PlugZap className="animate-pulse size-14 text-primary/60 absolute top-[42.2%]" />
       <p className="mt-4 text-center text-lg font-mono">Connecting to chat...</p>
    </div>
  )
}

export default ChatLoader