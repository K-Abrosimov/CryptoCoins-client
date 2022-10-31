import React, { useEffect, useRef, useState } from 'react'
import './Messanger.css'
import { io } from "socket.io-client";
import { isUserActivated, isUserAuth, userId } from '../../redux/user.selector';
import { connect } from 'react-redux';
import { profileLoaded, profilePhoto, profileFullName,profileSubscribe } from '../../redux/profile.selector';
import ChatUsers from '../../components/ChatUsers/ChatUsers';
import Message from '../../components/Message/Message';
import { useNavigate } from 'react-router-dom';
import NoUserAccess from '../../components/NoAcsessUser/NoAcsessUser';


const socket = io('ws://localhost:5000')

function Messanger(props) {

    const navigate = useNavigate()
    const [chatUsers, setChatUsers] = useState([])
    const [message, setMessage] = useState('')
    const scrollRef = useRef();
    const [messages,setMessages] = useState([])

    useEffect(()=>{
        if(props.isProfileLoaded) socket.emit('userJoin',{userId:props.userId,avatar:props.avatar,fullName:props.fullName})
        socket.on('getUsers',users =>{setChatUsers(users)})   
    },[props.isProfileLoaded])


    useEffect(()=>{
        socket.on('getMassage',(message =>{
            setMessages(mess=>[...mess,message])
        } ))
    },[])

    const sendMessage= ()=>{
        const massage = {
            userId:props.userId,
            author:props.fullName,
            text:message,
            createdAt:new Date()
        }
        socket.emit('sendMessage',(massage))
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [props.chatMessages]);


   // if(!props.isAuth || !props.isSubscribed){
   //     return <NoUserAccess isAuth={props.isAuth} isActivated={props.isActivated}/>}
   
    return (
        <div className="messenger">
            <div className="chatMenu"> 
                <div className="chatMenuWrapper">
                <h3>SUPPORT CHAT</h3>
                    {
                        chatUsers.map((user, key) => props.userId !== user.userId &&
                            <ChatUsers key={key} avatar={user.avatar} fullName={user.fullName} />
                        )}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        {messages.map((m, key) => (
                            <div key={key} ref={scrollRef}>
                                <Message message={m} own={m.senderId === props.userId} />
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea
                            className="chatMessageInput"
                            placeholder="write something..."
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        ></textarea>
                        <button className='chatSubmitButton' onClick={sendMessage}>Send</button>
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
    isAuth:isUserAuth(state),
    isActivated:isUserActivated(state),
    chatMessages:state.chat.messages
    
})

export default connect(mapStateToProps)(Messanger)
