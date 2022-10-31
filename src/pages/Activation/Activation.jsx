import React, { useEffect } from "react"
import { useState } from "react"
import { authApi } from "../../Api/serverApi"
import './Activation.css'


const Activation = () => {

    let [isSended, sendActivationLink] = useState(false)
    let [timer, setTimer] = useState(1)


    const sendLink = () => {
        sendActivationLink(!isSended)
        authApi.sendActivayionLink()
    }

    useEffect(() => {
        if (timer < 10  && isSended) {
            setTimeout(() => {
                setTimer(timer + 1)
            }, 1000);
        }
        else {
            setTimer(1)
            sendActivationLink(false)
        }
    }, [timer,isSended]);






    return <div className="activation">
        <h1> Activate your Account :)))</h1>
        {!isSended ? <div>
            <h3>The link was sent to the email address specified during registration...</h3>
            <h3>To send an activation link again, click on the <button onClick={sendLink}>Send</button></h3>
        </div> :
            <div>
                <h3>The link was sent to the email address specified during registration...</h3>
                <h3>the link was sent...</h3>
              <div className='timer'>{timer}</div>
            </div>
        }
    </div>
}

export default Activation