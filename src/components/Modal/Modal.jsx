import React from "react";
import './Modal.css'
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({active,setActive,children})=>{

    return <div className={active? "active-modal" : "modal" } onClick={()=>setActive(false)}>
        <div className={active? "modal-content-active" : "modal-content"} onClick={e => e.stopPropagation() }>
            <div className="close-btn" onClick={()=>setActive(false)}><AiFillCloseCircle style={{fontSize:"22px"}}/></div>
    {children}
        </div>
    </div>
}

export default Modal