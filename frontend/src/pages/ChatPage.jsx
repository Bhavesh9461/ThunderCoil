import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser.js'
import { useQuery } from '@tanstack/react-query'
import { getStreamToken } from '../lib/api.js'

import { Channel,ChannelHeader,Chat,MessageInput,MessageList,Thread,Window } from "stream-chat-react";
import { StreamChat } from 'stream-chat'
import toast from 'react-hot-toast'
import ChatLoader from '../components/ChatLoader.jsx'
import CallButton from '../components/CallButton.jsx'

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {

  const {id: targetUserId} = useParams()

  const [chatClient, setChatClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)

  const {authUser} = useAuthUser()

  const {data:tokenData} = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser //this will run only when authUser is available
  })

  // create a connection
  useEffect(()=>{
    const initChat = async () => {
      if(!tokenData?.token || !authUser) return

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY)

        await client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic
        }, tokenData.token)

        // create channel using own id for that channel
        const channelId = [authUser._id, targetUserId].sort().join("-")

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId]    
        })

        //fetch the channel state
        await currChannel.watch()

        setChatClient(client)
        setChannel(currChannel)
        
      } catch (error) {
        console.error("Error initializing chat:", error)
        toast.error("Could not connect to chat. Please try again.")
      } finally{
        setLoading(false)
      }
    }
    
    initChat()
  },[tokenData, authUser, targetUserId])

  // handle video calling
  const handleVideoCall = ()=>{
    if(channel){
      const callUrl = `${window.location.origin}/call/${channel.id}`

      channel.sendMessage({
        text: `I've started video call. Join me here: ${callUrl}`,
      })

      toast.success("Video call link send successfully!")
    }
  }

  if(loading || !chatClient || !channel) return <ChatLoader/>

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">

            {/* CALL BUTTON COMPONENT */}
            <CallButton handleVideoCall={handleVideoCall} />

            {/* add channel component */}
            <Window>
              <ChannelHeader/>
              <MessageList/>
              <MessageInput focus />
            </Window>
        
          </div>
          {/* for muliple threads or multiple replies on 1 msg */}
          <Thread/>    
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage