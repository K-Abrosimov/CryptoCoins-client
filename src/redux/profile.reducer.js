import { profileApi } from '../Api/serverApi'


const SET_PROFILE = 'SET_PROFILE'
const PROFILE_LOADED = 'PROFILE_LOADED'
const SET_STATUS = 'SET_STATUS'
const SET_IMAGE = 'SET_IMAGE'

export const setProfile = (profile) => ({ type: SET_PROFILE, profile })
export const isProfileLoaded = (bool) => ({ type: PROFILE_LOADED, bool })
const setSatus = (status) => ({ type: SET_STATUS, status })
const setImage = (image) => ({ type: SET_IMAGE, image })


export const getUserProfile = () => (dispatch) => {
    profileApi.getProfile().then(response => {
        dispatch(setProfile(response.data.profile))
        dispatch(isProfileLoaded(true))
    }).catch((error) => {
        console.log(error.response.data.message)
    })
}
export const updateUserProfile = (payload, file) => (dispatch) => {
    profileApi.updateProfile(payload).then(response => {
        dispatch(setProfile(response.data.profile))
    })
}
export const updateProfileImage = (file) => (dispatch) => {
    
    if (file) {
        profileApi.uploadProfileImage(file).then(response => {
            dispatch(setImage(response.data.photo))
        }).catch((error) => console.log(error.response.data.message))
    }
}
export const updateUserStatus = (status) => (dispatch) => {

    profileApi.updateProfileStatus(status).then(responce => {
        dispatch(setSatus(responce.data.status))
    }).catch((error) => {
        console.log(error.response.message)
    })
}


let intialState = {
    profile: {
        userId: '',
        fullName: '',
        photo: '',
        aboutMe: '',
        status: '',
        phone: '',
        socialNetworks: {    
            facebook: '',
            instagram: '',
            twitter: '',
            youtube: ''
        },
        stripeId: "",
        subscriptionStart: null,
        subscriptionTerm: null,
        isSubscribed:false
    },
    isProfileLoaded: false
}

const profileReducer = (state = intialState, action) => {
    switch (action.type) {
        case SET_PROFILE:

            return {
                ...state, profile: action.profile
            };
        case PROFILE_LOADED:
            return {
                ...state, isProfileLoaded: action.bool
            };
        case SET_STATUS:
            return {
                ...state, profile: { ...state.profile, status: action.status }
            };
        case SET_IMAGE:
          
            return {
                ...state,profile: {...state.profile,photo: action.image}
            }
        default:
            return state;
    }
}

export default profileReducer