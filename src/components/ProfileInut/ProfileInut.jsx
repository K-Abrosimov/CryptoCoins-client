import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import facebooKIcon from '../../images/facebook.png'
import twitterIcon from '../../images/twitter.png'
import instagramIcon from '../../images/instagram.png'
import youtubeIcon from '../../images/youtube.png'
import './ProfileInput.css'
import { Controller } from 'react-hook-form'

function ProfileInput(props) {


  const [youtube, setYoutube] = useState(false)
  const [instagram, setInstagram] = useState(false)
  const [twitter, setTwitter] = useState(false)
  const [facebook, setFacebook] = useState(false)

  return (
    <div className='profile-input-wrapper'>
      <div className="input-wrapper">
        <label>Fullname</label>
        <input defaultValue={props.fullName} className='input' placeholder="Fullname" {...props.register("fullName", { maxLength: { value: 50 } })} />
      </div>
      {props.errors.fullName && <p className='input-error'>Name must be 50 characters maximum!</p>}

      <label>Phone</label>
      <Controller name="phone"
        control={props.control}
        defaultValue={props.phone}
        rules={{ maxLength: 12 }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            country='il'
            value={props.phone}
            masks={{ il: '(...) ..-..-..' }}

            onChange={onChange}
            defaultCountry="TH"
            id="phone-input"
            specialLabel=''
          />
        )}
      />

      <div className="input-wrapper">
        <label>Status</label>
        <input defaultValue={props.status} className='input' placeholder="Status" {...props.register("status", { maxLength: { value: 80 } })} />
      </div>
      {props.errors.status && <p className='input-error'>Status must to be max: 80 signs!</p>}
      <div className="input-wrapper">
        <label>About me</label>
        <input defaultValue={props.aboutMe} className='input' placeholder="About me" {...props.register("aboutMe", { maxLength: { value: 300 } })} />
      </div>
      {props.errors.aboutMe && <p className='input-error'>Maximum 300 characters!</p>}

      <div className="contacts">
        <label>Contacts</label>
        <div className="contact-img">
          <img onClick={() => setFacebook(!facebook)} alt='facebook' src={facebooKIcon} />
          <img onClick={() => setTwitter(!twitter)} alt='twitter' src={twitterIcon} />
          <img onClick={() => setInstagram(!instagram)} alt='instagram' src={instagramIcon} />
          <img onClick={() => setYoutube(!youtube)} alt='youtube' src={youtubeIcon} />
        </div>

        {facebook && <label>Facebook</label>}
        <input style={{ display: facebook || 'none' }} defaultValue={props.socialNetworks?.facebook} className='input' placeholder="Facebook" {...props.register("facebook")} />

        {twitter && <label>Twitter</label>}
        <input style={{ display: twitter || 'none' }} defaultValue={props.socialNetworks?.twitter} className='input' placeholder="Twitter" {...props.register("twitter")} />

        {instagram && <label>Instagram</label>}
        <input style={{ display: instagram || 'none' }} defaultValue={props.socialNetworks?.instagram} className='input' placeholder="Instagram" {...props.register("instagram")} />

        {youtube && <label>Youtube</label>}
        <input style={{ display: youtube || 'none' }} defaultValue={props.socialNetworks?.youtube} className='input' placeholder="Youtube" {...props.register("youtube")} />

      </div>
      <input className='submit-btn' type="submit" value="Submit" />
    </div>
  )
}

export default ProfileInput
