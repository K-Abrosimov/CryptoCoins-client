import React, { useEffect, useState } from 'react'
import { profileLoaded, profileSubscribe } from '../../redux/profile.selector'
import { isUserActivated, isUserAuth } from '../../redux/user.selector'
import { FaGem, FaBan, FaRegCheckCircle } from "react-icons/fa";
import { connect } from 'react-redux';
import './investments.css'
import {investmentsApi} from '../../Api/serverApi'
import { getUserProfile } from '../../redux/profile.reducer';
import NoUserAccess from '../../components/NoAcsessUser/NoAcsessUser';

function Investments(props) {

    useEffect(() => {
        if (!props.isProfileLoaded) {
            props.getUserProfile()
        }
    },[props.isProfileLoaded])

    return (
        <div className='investments'>
            {props.isAuth && props.isSubscribed ? <UserAcsess /> : <NoUserAccess isAuth={props.isAuth} isActivated={props.isActivated} />}
        </div>
    )
}


const UserAcsess = (props) => {
    const [investData, setInvestData] = useState([]);
    useEffect(() => {
        investmentsApi.getInvestData().then(responce => {
            setInvestData(responce.data.investDto)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className='user-acsess'>
             <h1> Investment info</h1>
             <h3>REMENBER !!!</h3>
            <p>All our forecasts refer to spot trading and are advisory in nature.  We are not responsible for your investments.</p>
            <div className="acsess-data">        
                {investData.map(i => <Info key={i.id} date={i.date} coin_name={i.coin_name}
                    invest_period={i.invest_period} open_order={i.open_order} recommendation={i.recommendation}
                    new_order={i.new_order} target_line={i.target_line} stop_line={i.stop_line} description={i.description}
                />)}
            </div>
        </div>
    )
}

const Info = (props) => {
    return <div className="investDataWrapper">
        <div style={{ color: "green" }}><span>Date:</span>{props.date}</div>
        <div style={{ color: "orange" }}><span>Coin name:</span>{props.coin_name}</div>
        <div style={{ color: "#1d8dbd" }}><span>Investment period:</span>{props.invest_period}</div>
        <div><span>Open order:</span>{props.open_order}</div>
        <div style={{ color: "gold" }}><span>Recommendation:</span>{props.recommendation}</div>
        <div><span>New order:</span>{props.new_order}</div>
        <div style={{ color: "#22cd19" }}><span>Target line:</span>{props.target_line}</div>
        <div style={{ color: "#d12929" }}><span>Stop line:</span>{props.stop_line}</div>
        <div style={{ color: "grey" }}><span>Description:</span>{props.description}</div>
    </div>
}


let mapStateToProps = (state) => ({
    isAuth: isUserAuth(state),
    isSubscribed: profileSubscribe(state),
    isActivated: isUserActivated(state),
    isProfileLoaded:profileLoaded(state)
})


export default connect(mapStateToProps,{getUserProfile})(Investments)