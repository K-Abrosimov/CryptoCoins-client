export const isUserAuth = (state)=>{
    return state.user.isAuth
}
export const errorMessage = (state)=>{
    return state.user.errorMessage
}
export const userData = (state)=>{
    return state.user.user
}
export const isFetching = (state)=>{
    return state.user.isFetch
}
export const userEmail = (state)=>{
    return state.user.user.email
}
export const isUserActivated = (state)=>{
    return state.user.user.isActivated
}
export const userRole = (state)=>{
    return state.user.user.roles
}
export const userId = (state)=>{
    return state.user.user.id
}