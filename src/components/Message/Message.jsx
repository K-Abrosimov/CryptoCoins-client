import "./Message.css";
import { format } from "timeago.js";
import profile from '../../images/profile.jpg'

export default function Message({ message, own }) {

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={message.avatar || profile}
          alt="avatar"
        />
       
        <span className="messageText"><p className="author">{message.author || 'no name'}</p>{message.text}</span>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}