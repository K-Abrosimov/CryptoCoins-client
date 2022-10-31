import React from 'react'
import { FaGem, FaBan, FaRegCheckCircle } from "react-icons/fa";
import './NoAcsessUser.css'


const NoUserAccess = (props) => {

    return <div className="noUserAccess">

        <h1>You do not have access to this page.</h1>
        <h3>To access and use our investment tips, you must complete three steps</h3>

        <div className="stepsWrapper">
            <div className="step">
                <div className="stepContent">
                    <div className="stepTitle">Step 1</div> First of all, you need to register on our website.</div>
                <div className="StepStatus">
                    {props.isAuth ? <div className="complete"> COMPLETE <FaRegCheckCircle /></div> : <div>  NOT COMPLETE <FaBan /> </div>}
                </div>

            </div>
            <div className="Step">
                <div className="stepContent"> <div className="stepTitle">Step 2
                </div>After registration, you need to activate your account. The activation
                    link will be sent to the email address specified during registration.</div>
                <div className="StepStatus">
                    {props.isAuth && props.isActivated ? <div className="complete"> COMPLETE <FaRegCheckCircle /></div> : <div>  NOT COMPLETE <FaBan /> </div>}
                </div>

            </div>
            <div className="Step">
                <div className="stepContent"> <div className="stepTitle">Step 3</div>Choose from three subscription options
                    by clicking on the subscription tab.</div>
                <div className="StepStatus">
                    NOT COMPLETE <FaBan />
                </div>
            </div>
        </div>

        <h2>What do you get by subscribing to our services?</h2>
        <h3>You receive detailed investment instructions such as.</h3>
        <div className="invesmentsAnalysis">

            <p><FaGem style={{ verticalAlign: "middle", color: "rgb(140, 139, 162)", marginRight: '7px' }} /> When is it profitable to buy cryptocurrencies. ( We publish entry points for buying coins ).</p>
            <p><FaGem style={{ verticalAlign: "middle", color: "rgb(140, 139, 162)", marginRight: '7px' }} /> When is it profitable to sell cryptocurrency. ( We publish exit points for selling cryptocurrencies ).</p>
            <p><FaGem style={{ verticalAlign: "middle", color: "rgb(140, 139, 162)", marginRight: '7px' }} /> What coins to buy for long-term investment.</p>
            <p><FaGem style={{ verticalAlign: "middle", color: "rgb(140, 139, 162)", marginRight: '7px' }} /> What coins to buy for medium-term investment.</p>
            <p><FaGem style={{ verticalAlign: "middle", color: "rgb(140, 139, 162)", marginRight: '7px' }} /> What coins to buy for short-term investment.</p>
        </div>

        <h3>Chat</h3>
        <div className="invesmentsAnalysis">

            <p><FaGem style={{ verticalAlign: "middle", color: "rgb(140, 139, 162)", marginRight: '7px' }} />Access to a chat that was created specifically for communication and consultation with our investment specialists.</p>
        </div>
    </div>
}

export default NoUserAccess
