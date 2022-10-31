import axios from "axios"
import { authApi } from "../Api/serverApi"
import {setProfile,isProfileLoaded} from './profile.reducer'

const SET_USER = 'SET_USER'
const SET_AUTH = 'IS_AUTH'
const SET_SiGN_UP_ERROR_MESSAGE = 'SET_SiGN_UP_ERROR_MESSAGE'
const SET_LOGIN_ERROR_MESSAGE = 'SET_LOGIN_ERROR_MESSAGE'
const FEATCH = 'FEATCH'

const setUser = (user) => ({ type: SET_USER, user })
const setAuth = (bool) => ({ type: SET_AUTH, bool })
const setSignUpErrorMessage = (message) => ({ type: SET_SiGN_UP_ERROR_MESSAGE, message })
const setLoginErrorMessage = (message) => ({ type: SET_LOGIN_ERROR_MESSAGE, message })
const isFetchingInProgress = (bool) => ({ type: FEATCH, bool })

export const signUpUser = (user) => (dispatch) => {
    dispatch(isFetchingInProgress(true))
    authApi.registration(user.email, user.password).then(response => {
        localStorage.setItem('token', response.data.acsessToken)
        dispatch(setUser(response.data.user))
        dispatch(setAuth(true))
        dispatch(setSignUpErrorMessage(''))
        dispatch(setLoginErrorMessage(''))
        dispatch(isFetchingInProgress(false))   
    }).catch(error => {
        dispatch(isFetchingInProgress(false))
        dispatch(setSignUpErrorMessage(error.response.data.message))
    })
}

export const loginUser = (user) => (dispatch) => {
    dispatch(isFetchingInProgress(true))
    authApi.login(user.email, user.password).then(response => {
        localStorage.setItem('token', response.data.acsessToken)
        dispatch(setUser(response.data.user))
        dispatch(setAuth(true))
        dispatch(isFetchingInProgress(false))
        dispatch(setLoginErrorMessage(''))
    }).catch(error => {
        dispatch(isFetchingInProgress(false))
        dispatch(setLoginErrorMessage(error.response.data.message))
    })
}

export const logoutUser = () => (dispatch) => {
    authApi.logout().then(response => {
        if (response.data.resultCode === 0) {
            localStorage.removeItem('token')
            dispatch(setUser({
                id: "",
                email: "",
                isActivated: false,
                roles: []
            }))
            dispatch(setProfile({
                userId: '',
                fullName: '',
                photo: '',
                aboutMe: '',
                status: '',
                contacts: {
                    phone: '',
                    facebook: '',
                    instagram: '',
                    twitter: '',
                    youtube: ''
                },
                stripeId: "",
                subscriptionStart: null,
                subscriptionTerm: null
            }))
            dispatch(isProfileLoaded(false))           
            dispatch(setAuth(false))
        }
    })
}

export const checkAuth = () => (dispatch) => {
    {
        dispatch(isFetchingInProgress(true))
        axios.get('http://localhost:5000/api/refresh', {
            withCredentials: true
        }).then(response => {
            localStorage.setItem('token', response.data.acsessToken)
            dispatch(setAuth(true))
            dispatch(setUser(response.data.user))
            dispatch(isFetchingInProgress(false))
        }).catch(error => {
            dispatch(isFetchingInProgress(false))
            console.log(error.response.data.message)
        })
    }
}

let initialState = {
    user: {
        id: "",
        email: "",
        isActivated: false,
        roles: []
    },
    isAuth: false,
    errorMessage: {
        signUpError: '',
        loginError: ''
    },
    isFetch: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state, user: action.user
            };
        case SET_AUTH:
            return {
                ...state, isAuth: action.bool
            };
        case SET_SiGN_UP_ERROR_MESSAGE:
            return {
                ...state, errorMessage: {
                    ...state.errorMessage, signUpError: action.message
                }
            };
        case SET_LOGIN_ERROR_MESSAGE:
            return {
                ...state, errorMessage: {
                    ...state.errorMessage, loginError: action.message
                }
            };
        case FEATCH:
            return {
                ...state, isFetch: action.bool
            };
        default:
            return state;
    }
}

export default userReducer;