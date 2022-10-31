import React, { useState } from 'react'
import './Status.css'
import { FiEdit } from "react-icons/fi";
import { useForm } from 'react-hook-form';

function Status(props) {

    const [editProfile, setEditProfile] = useState()

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onBlur',
    });
    
    const checkKeyDown = (e) => {
        if (e.code === 'Enter'){
            e.preventDefault();  
            props.updateUserStatus(e.target.value) 
            setEditProfile(false)
        }  
      };

    const onSubmit = data => {
        props.updateUserStatus(data.status)
        setEditProfile(false)
        reset()
    }

  return (
    <div className="profile-status">
    <h1>Profile</h1>
    {editProfile && <form className="input-wrapper">
        <input autoFocus={true}  onKeyDown={(e) => checkKeyDown(e)} placeholder='Enter Your status...' type={"text"} defaultValue={props.status}
         {...register("status", { maxLength: { value: 80 } })}
            onBlur={handleSubmit(onSubmit)} />
        {errors.status && <p className='input-error'>Status must to be max: 80 signs!</p>}
    </form>}

    {!editProfile && <div className='status-box'
        onClick={() => setEditProfile(true)}>
        <span className='title'> Status:</span>
        <span className='status'>{props.status || "Click to post status..."}  <FiEdit className="editIcon"/></span></div>}
</div>
  )
}

export default Status