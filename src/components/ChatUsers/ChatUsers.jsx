import React from 'react'
import './ChatUsers.css'
import profile from '../../images/profile.jpg'


function ChatUsers({avatar,fullName,createConversation,userId}) {

  return (
    <div className="chat-user" onClick={()=>createConversation(userId)}>
      <img
        className="chat-user-img"
        src={ avatar || profile}
        alt="user-avatar"
      />
      <span className="chat-user-name">{fullName || 'no name'}</span>
    </div>
  )
}

export default ChatUsers
