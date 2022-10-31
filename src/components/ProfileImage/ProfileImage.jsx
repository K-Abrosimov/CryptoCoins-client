import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdUpload } from "react-icons/md";
import profile from '../../images/profile.jpg'
import './ProfileImage.css'

function EditProfileImage(props) {

    const [imagePreview, setImagePreview] = useState(null)
    const [imageUpload, setImageUpload] = useState(false)

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = data => {
        let file = null
        if (data.photo.length > 0) {
            file = data.photo[0]
        }
        props.updateProfileImage(file)
        setImageUpload(false)
    }

    useEffect(() => {
        if (watch('photo').length > 0) {
            setImagePreview(URL.createObjectURL(watch('photo')[0]))
        }
    }, [watch('photo')])

    return (
        <div className="profile-image">
            <form onChange={() => setImageUpload(true)} onSubmit={handleSubmit(onSubmit)}>
                <div className="profile-pic__container">
                    <img alt="profile-photo" src={imagePreview || props.photo || profile} className='profile-pic' />
                    <label htmlFor='image-upload' className='image-upload-label'>
                        <MdUpload className='add-picture-icon' />
                    </label>
                    {imageUpload && <button className='upload-btn' value="Submit">Save image</button>}
                    <input name="file" id="image-upload" type="file" style={{ display: "none" }}
                        className='inputfile' accept="image/png, image/jpeg"
                        {...register("photo", { validate: value => value[0]?.size ? value[0].size < 1048576 * 5 : null })} />
                </div>
                {errors?.photo && <p className="input-error">{errors?.photo?.message || 'max file size is 5Mb'}</p>}
            </form>
        </div>
    )
}

export default EditProfileImage