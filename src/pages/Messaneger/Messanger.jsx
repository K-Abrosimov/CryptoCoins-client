import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import Chat from '../../components/Chat/Chat'
import { profileFullName } from '../../redux/profile.selector'

const socket = io.connect("http://localhost:5000")



function Messanger(props) {

    const room = "INVESTMET_CHAT"

    const joinRoom = ()=>{
        socket.emit("join_room",room)
        

    }


  return (
    <div className='messanger'>

    <h3>{room}</h3>
    <button onClick={joinRoom}>Join room</button>
        <Chat socket={socket} room={room} fullName={props.fullName}/>   
    </div>
  )
}

let mapStateToProps=(state)=>({
    fullName:profileFullName(state)
})

export default connect()( Messanger)
