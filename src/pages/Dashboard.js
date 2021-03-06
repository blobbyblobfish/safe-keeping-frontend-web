import React from 'react'
import { connect } from 'react-redux'

import UserTracker from '../components/UserTracker'

function Dashboard({ state, dispatch }) {

    function renderUserTrackers() {
        return state.users.map(user => <UserTracker key={user.id} user={user} />)
    }

    return (
        <div className="dashboard">
            <h2 className="row">My Clients</h2>
            {/* <h4 className="rightAlign" style={{ paddingBottom: 20 }}>My Email: {state.auth.email} </h4> */}
            {renderUserTrackers()}
        </div>
    )
}

export default connect((state)=>({state}))(Dashboard)