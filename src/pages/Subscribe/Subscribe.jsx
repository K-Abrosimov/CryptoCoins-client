import React, { useEffect } from 'react'
import './Subscribe.css'
import { paymentApi } from '../../Api/serverApi'
import { useState } from 'react'
import { connect } from 'react-redux'
import { profileLoaded, profileSubscribe } from '../../redux/profile.selector'
import { getUserProfile } from '../../redux/profile.reducer'
import Modal from '../../components/Modal/Modal'
import { FiAlertTriangle } from "react-icons/fi";
import { isUserActivated, isUserAuth } from '../../redux/user.selector'


function Subscribe(props) {

    const [active, setActive] = useState(false)

    const Checkout = (priceId) => {

        if (props.isAuth && !props.isSubscribed) {
            paymentApi.createCheckoutSession(priceId).then(response =>
                window.location.href = response.data.url
            )
        }
        else setActive(true)
    }
    return (
        <div className='subscribe'>
            <h1>Subscribe to receive the latest forecasts on the crypto market.</h1>
            <p>By subscribing, you will receive useful information about investments.
                At what prices to buy coins, sell coins and for what purposes to hold coins.
                All these predictions are made for you by experienced investors. Follow their
                instructions and multiply your cryptocurrency deposits.</p>
            <div className="card-box">
                <section>
                    <div className="product">
                        <img
                            src="https://i.imgur.com/EHyR2nP.png"
                            alt="The cover of Stubborn Attachments"
                        />
                        <div className="description">
                            <h3>Stubborn Attachments</h3>
                            <h5>$10.00</h5>
                        </div>
                    </div>
                    <button onClick={(e => Checkout('price_1LdqXmGYnJaCXuRmwH9AkhVA'))} >
                        Checkout
                    </button>
                </section>
                <section>
                    <div className="product">
                        <img
                            src="https://i.imgur.com/EHyR2nP.png"
                            alt="The cover of Stubborn Attachments"
                        />
                        <div className="description">
                            <h3>Stubborn Attachments</h3>
                            <h5>$25.00</h5>
                        </div>
                    </div>
                    <button onClick={(e => Checkout('price_1LdqaVGYnJaCXuRmCJauBLu1'))} >
                        Checkout
                    </button>
                </section>
                <section>
                    <div className="product">
                        <img
                            src="https://i.imgur.com/EHyR2nP.png"
                            alt="The cover of Stubborn Attachments"
                        />
                        <div className="description">
                            <h3>Stubborn Attachments</h3>
                            <h5>$45.00</h5>
                        </div>
                    </div>
                    <button onClick={(e => Checkout('price_1LdqbXGYnJaCXuRmdmFVfdDk'))}>
                        Checkout
                    </button>
                </section>

                <Modal active={active} setActive={setActive}>

                    {props.isAuth && props.isSubscribed && <div className='alet-modal'>
                        <FiAlertTriangle className='icon' />
                        Your subscription has not yet expired!!!
                    </div>}

                    {!props.isAuth && <div className='alet-modal'>
                        <FiAlertTriangle className='icon' />
                        User not authorized!!!
                    </div>}

                </Modal>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isProfileLoaded: profileLoaded(state),
    isSubscribed: profileSubscribe(state),
    isAuth: isUserAuth(state),
    isActivated: isUserActivated(state)
})

export default connect(mapStateToProps, { getUserProfile })(Subscribe)
