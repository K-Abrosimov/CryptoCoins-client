import React, { useEffect, useRef, useState } from 'react'
import './Support.css'
import { io } from "socket.io-client";
import { isUserActivated, isUserAuth, userId, userRole } from '../../redux/user.selector';
import { connect } from 'react-redux';
import { profileLoaded, profilePhoto, profileFullName, profileSubscribe } from '../../redux/profile.selector';
import ChatUsers from '../../components/ChatUsers/ChatUsers';
import Message from '../../components/Message/Message';
import { resolvePath, useNavigate } from 'react-router-dom';
import NoUserAccess from '../../components/NoAcsessUser/NoAcsessUser';
import { supportApi, userApi } from '../../Api/serverApi';
import Conversation from '../../components/Conversation/Conversation';



function Messanger( {userId,avatar,fullName,isProfileLoaded,chatMessages,role}) {
 
    // if(!props.isAuth || !props.isSubscribed){
    //return <NoUserAccess isAuth={props.isAuth} isActivated={props.isActivated}/>}

    const navigate = useNavigate()
    const [chatUsers, setChatUsers] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState("");
    const socket = useRef();


    useEffect(()=>{
      socket.current = io('ws://localhost:5000')
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.sender,
          author:data.author,
          avatar:data.avatar,
          text: data.text,
          createdAt: Date.now(),
        });
      });
      supportApi.getConversation().then(response => {
        setConversations(response.data.conversation)
    
      })

    },[]) 

    useEffect(()=>{
      isProfileLoaded && socket.current.emit('addUser',{userId,fullName,avatar})
    },[isProfileLoaded])

    useEffect(()=>{
      socket.current.on('getUsers',users => setChatUsers(users))
    },[chatUsers])

    useEffect(() => {
      debugger
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);


    const handleSubmit = async (e) => {

      e.preventDefault();
      const message = {
        sender: userId,
        author:fullName,
        avatar,
        text: newMessage,
        conversationId: currentChat._id,
      };
  
      const receiverId = currentChat.members.find(
        (member) => member !== userId
      );

      socket.current.emit("sendMessage", {
        sender: userId,
        receiverId,
        author:fullName,
        avatar,
        text: newMessage,
      });

      supportApi.sendMessage(message).then(response=>{
        setMessages([...messages, response.data.savedMassege]);
        setNewMessage("");
      })
     
    };

      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    return (
        <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <h3>SUPPORT CHAT</h3>
            {conversations.map((c) => (        
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userId} />
              </div>
            ))}
          </div>
        </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        {messages.map((m, key) => (
                            <div key={key} ref={scrollRef}>
                                <Message message={m} own={m.sender === userId} />
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea
                            className="chatMessageInput"
                            placeholder="write something..."
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                        ></textarea>
                        <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    userId: userId(state),
    fullName: profileFullName(state),
    isProfileLoaded: profileLoaded(state),
    avatar: profilePhoto(state),
    isSubscribed: profileSubscribe(state),
    isAuth: isUserAuth(state),
    isActivated: isUserActivated(state),
    role:userRole(state)

})

export default connect(mapStateToProps)(Messanger)
