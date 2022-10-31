import { applyMiddleware,combineReducers,createStore } from "redux";
import userReducer from "./user.reduser";
import thunk from 'redux-thunk'
import profileReducer from "./profile.reducer";


const reducer = combineReducers({
    user:userReducer,
    profile:profileReducer,
})

let store = createStore(reducer,applyMiddleware(thunk))

export default store;
window.Storage = store

