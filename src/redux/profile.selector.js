export const userProfile = (state)=>{
    return state.profile.profile
}
export const profileLoaded = (state)=>{
    return state.profile.isProfileLoaded
}
export const profilePhoto = (state)=>{
    return state.profile.profile.photo
}
export const profileFullName = (state)=>{
    return state.profile.profile.fullName
}
export const profileSocialNetworks = (state)=>{
    return state.profile.profile.socialNetworks
}
export const profilePhone = (state)=>{
    return state.profile.profile.phone
}
export const profileAboutMe =(state)=>{
    return state.profile.profile.aboutMe
}
export const profileStatus = (state)=>{
    return state.profile.profile.status
}
export const profileSubscribe = (state)=>{
    return state.profile.profile.isSubscribed
}
export const profileSubscriptionStart=(state)=>{
    return state.profile.profile.subscriptionStart
}

export const profilesubscriptionTerm=(state)=>{
    return state.profile.profile.subscriptionTerm
}