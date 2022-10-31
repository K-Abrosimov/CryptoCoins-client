import axios from "axios";
import { useEffect, useState } from "react";
import { userApi } from "../../Api/serverApi";
import "./conversation.css";
import profile from '../../images/profile.jpg'

export default function Conversation({ conversation, currentUser }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
        userApi.getUserById(friendId).then(response => {
          setUser(response.data.user)})
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={user?.photo || profile } alt="avatar"/>
      <span className="conversationName">{user?.fullName}</span>
    </div>
  );
}
