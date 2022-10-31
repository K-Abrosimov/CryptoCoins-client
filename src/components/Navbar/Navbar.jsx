import React from 'react'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginUser, logoutUser, signUpUser } from '../../redux/user.reduser'
import { errorMessage, isFetching, isUserAuth, userData, userRole } from '../../redux/user.selector'
import Login from '../Login/Login'
import Modal from '../Modal/Modal'
import SignUp from '../Signup/SignUp'
import './Navbar.css'

function Navbar(props) {
    const [activeSingUp, setActiveSingUp] = useState(false)
    const [activeLogin, setActiveLogin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (props.isAuth) {
            setActiveSingUp(false)
            setActiveLogin(false)
        }
    },[props.isAuth])

    const Logout = () => {
        props.logoutUser()
        navigate('/')
    }

    return (
        <div className="navbar-wrapper">
            <div className='navbar'>

                <div className="nav-logo">
                    <span>Crypto</span>coins
                </div>

                <div className="nav-links">
                    <NavLink to='/' className={({ isActive }) => isActive ? "active-link" : null}>Home</NavLink>
                    <NavLink to='/investments' className={({ isActive }) => isActive ? "active-link" : null}>Investments</NavLink>
                    <NavLink to='/cryptocurrency' className={({ isActive }) => isActive ? "active-link" : null}>Cryptocurrency</NavLink>
                    <NavLink to='/subscribe' className={({ isActive }) => isActive ? "active-link" : null}>Subscribe</NavLink>
                    <NavLink to='/support' className={({ isActive }) => isActive ? "active-link" : null}>Support</NavLink>

                    
                    {props.roles.includes('ADMIN')&& <NavLink to='/manage' className={({ isActive }) => isActive ? "active-link" : null}>Manage</NavLink> }
                </div>

                <div className="nav-authorization">

                    {props.isFetch ? <div>Loading...</div> :
                        props.isAuth ?
                            <div className='auth-info'>
                                <NavLink className="user-email" to='profile'>{props.user.email}</NavLink>
                                <button onClick={Logout}>Logout</button>
                            </div>
                            :
                            <div className="auth-links">
                                <Modal active={activeLogin} setActive={setActiveLogin}>
                                    <Login errorMessage={props.errorMessage.loginError} loginUser={props.loginUser} />
                                </Modal>
                                <button onClick={() => setActiveLogin(true)}>Login</button>
                                <Modal active={activeSingUp} setActive={setActiveSingUp}>
                                    <SignUp errorMessage={props.errorMessage.signUpError} signUpUser={props.signUpUser} />
                                </Modal>
                                <button onClick={() => setActiveSingUp(true)}>Sing up</button>
                            </div>}
                </div>
            </div>
            {props.isAuth && !props.user.isActivated && <div className="account-activation">
                 <NavLink to='/activation'>--- Press to activate your account ---</NavLink></div>}
        </div>
    )
}
let mapStateToProps = (state) => ({
    isAuth: isUserAuth(state),
    errorMessage: errorMessage(state),
    user: userData(state),
    isFetch: isFetching(state),
    roles:userRole(state)
})


export default connect(mapStateToProps, { signUpUser, loginUser, logoutUser })(Navbar)