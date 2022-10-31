
import { connect } from 'react-redux';
import React, { useState, useEffect } from "react";
import { isUserAuth, userRole } from "../../redux/user.selector";
import Modal from "../../components/Modal/Modal";
import AddinvestInfo from "../../components/AddInnvestInfo/AddinvestInfo";
import Investinfo from '../../components/UpdateinvestInfo/Investinfo';
import './Manage.css'


const Manage = (props) => {
    const [active, setActive] = useState(false)
    const [editMode, setEditMode] = useState(false)

    
    if (!props.isAuth && !props.roles.includes('ADMIN')) {
        return <h1 className="acsessOnly">Acsess only to Admin !!!</h1>
    }

    return (
        <div className="manage">
                <h1>Manage page</h1>
                <div className="manageWrapper">
                    <button onClick={() => setEditMode(true)}>Add info</button>
                    {editMode && <AddinvestInfo closeForm={setEditMode} />}
                    {!editMode && <Investinfo />}
                    <Modal active={active} setActive={setActive} />
                </div>     
        </div>
    )
}

let mapStateToProps = (state) => ({
    isAuth: isUserAuth(state),
    roles:userRole(state)
})

export default connect(mapStateToProps)(Manage)