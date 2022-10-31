import React, { useEffect, useState } from 'react'
import ProfileInput from '../../components/ProfileInut/ProfileInut'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { profileAboutMe, profileFullName, profileLoaded, profilePhone, profilePhoto, profileSocialNetworks, profileStatus, profileSubscribe, profileSubscriptionStart, profilesubscriptionTerm } from '../../redux/profile.selector'
import { getUserProfile, updateProfileImage, updateUserProfile, updateUserStatus } from '../../redux/profile.reducer'
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import Status from '../../components/Status/Status'
import { BiUserCircle, BiPhone, BiMailSend, BiMessageEdit } from "react-icons/bi";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { TbPlugConnectedX } from "react-icons/tb";
import facebooKIcon from '../../images/facebook.png'
import twitterIcon from '../../images/twitter.png'
import instagramIcon from '../../images/instagram.png'
import youtubeIcon from '../../images/youtube.png'
import './Profile.css'
import { userEmail } from '../../redux/user.selector'
import { NavLink } from 'react-router-dom'


function Profile(props) {

    const [editMode, setEditMode] = useState(false)

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = data => {
        props.updateUserProfile(data)
        setEditMode(false)
    }

    return (
        <div className='profile'>
            <Status status={props.status} updateUserStatus={props.updateUserStatus} />
            <div className="profile-info-wrapper">
                <ProfileImage photo={props.photo} updateProfileImage={props.updateProfileImage} />
                {editMode &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ProfileInput status={props.status} aboutMe={props.aboutMe} fullName={props.fullName}
                            socialNetworks={props.socialNetworks} phone={props.phone} register={register} errors={errors} control={control} />
                    </form>}

                {!editMode && <div className='profile-info'>

                    <h3>Profile information </h3>
                    {!editMode && <button onClick={() => setEditMode(true)}>Edit profile</button>}

                    <div className="data-box">
                        <label><BiUserCircle className='profile-icon' /></label>
                        <div className='profile-data'>{props.fullName || 'Fullname'}</div>
                    </div>

                    <div className="data-box">
                        <label><BiMailSend className='profile-icon' /></label>
                        <div className='profile-data'>{props.email}</div>
                    </div>

                    <div className="data-box">
                        <label><BiPhone className='profile-icon' /></label>
                        <div className='profile-data'>{props.phone ? '+' + props.phone : 'Phone'} </div>
                    </div>
                    <div className="data-box">
                        <label><BiMessageEdit className='profile-icon' /></label>
                        <div className='profile-data'>{props.aboutMe || 'About me'}</div>
                    </div>

                    <div className="social-netwoorks">
                        <h3>Social Networks</h3>

                        {props.socialNetworks?.twitter || props.socialNetworks?.instagram ||
                            props.socialNetworks?.youtube || props.socialNetworks?.facebook ?

                            <div className="networks-links">
                                {props.socialNetworks?.facebook && <a href={props.socialNetworks?.facebook}><img alt='icon' className='icon' src={facebooKIcon} /></a>}
                                {props.socialNetworks?.twitter && <a href={props.socialNetworks?.twitter}><img alt='icon' className='icon' src={twitterIcon} /></a>}
                                {props.socialNetworks?.instagram && <a href={props.socialNetworks?.instagram}><img alt='icon' className='icon' src={instagramIcon} /></a>}
                                {props.socialNetworks?.youtube && <a href={props.socialNetworks?.youtube}><img alt='icon' className='icon' src={youtubeIcon} /></a>}
                            </div>
                            : <TbPlugConnectedX className='no-nettorks-links' />}

                        <div className="subscribe-info">

                            <h3>Subscription</h3>
                            {!props.isSubscribed && <div className='lock'><AiFillLock className='lock-icon' /> User not subscribed.
                                Follow the llink to subscribe
                                <NavLink to='/subscribe'>Subscribe</NavLink></div>}

                            {props.isSubscribed && <div className='unlock'>                              
                                <div><span><AiFillUnlock/> Start:</span>{props.SubscriptionStart}</div>
                                <div><span><AiFillUnlock/> End:</span> {props.subscriptionTerm}</div>
                            </div>}
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}


let mapStateToProps = (state) => ({
    isProfileLoaded: profileLoaded(state),
    photo: profilePhoto(state),
    fullName: profileFullName(state),
    socialNetworks: profileSocialNetworks(state),
    aboutMe: profileAboutMe(state),
    status: profileStatus(state),
    email: userEmail(state),
    phone: profilePhone(state),
    isSubscribed: profileSubscribe(state),
    SubscriptionStart: profileSubscriptionStart(state),
    subscriptionTerm:profilesubscriptionTerm(state)
})


export default connect(mapStateToProps, { getUserProfile, updateUserProfile, updateUserStatus, updateProfileImage })(Profile)
