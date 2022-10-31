import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import './CreateProfile.css'
import { useState } from 'react';
import profile from '../../images/profile.jpg'
import { MdUpload } from "react-icons/md";
import { connect } from 'react-redux';
import { getUserProfile, updateProfileImage, updateUserProfile } from '../../redux/profile.reducer';
import { useNavigate } from 'react-router-dom';
import ProfileInput from '../../components/ProfileInut/ProfileInut';


function CreateProfile(props) {

    const [imagePreview, setImagePreview] = useState(null)
    const navigate = useNavigate()

    const { register, handleSubmit, setValue, watch,control, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = data => {
        let file = null
        if (data.photo.length > 0) {
            file = data.photo[0]
        }
        props.updateUserProfile(data)
        props.updateProfileImage(file)
        navigate('/')
    }

    useEffect(() => {
        if (watch('photo').length > 0) {
            setImagePreview(URL.createObjectURL(watch('photo')[0]))
        }
    }, [watch('photo')])

    return (
        <div className="create-profile">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='wrapper'>
                    <h1>Create Profile</h1>

                    <div className="signup-profile-pic__container">
                        <img alt="profile-photo" src={imagePreview || profile} className='signup-profile-pic' />
                        <label htmlFor='image-upload' className='image-upload-label'>
                            <MdUpload className='add-picture-icon' />
                        </label>
                        <input name="file" id="image-upload" type="file" style={{ display: "none" }}
                            className='inputfile' accept="image/png, image/jpeg"
                            {...register("photo", { validate: value => value[0]?.size ? value[0].size < 1048576 * 5 : null })} />
                    </div>
                </div>   
                <ProfileInput control={control} {...props} register={register} errors={errors} setValue={setValue}/>           
                {errors?.photo && <p className="input-error">{errors?.photo?.message || 'max file size is 5Mb'}</p>}
            </form>
        </div>
    );
}

let mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {getUserProfile, updateUserProfile, updateProfileImage })(CreateProfile)