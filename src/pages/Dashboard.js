import React from 'react'
import { connect } from 'react-redux'
import history from '../history'
import UserTracker from '../components/UserTracker'

function Dashboard({ state, dispatch }) {

    function renderUserTrackers() {
        return state.users.map(user => <UserTracker key={user.id} user={user} />)
    }

    return (
        <div className="dashboard">
            <h4 className="rightAlign">My Name: {state.auth.name} </h4>
            <h4 className="rightAlign">My Email: {state.auth.email} </h4>
            {renderUserTrackers()}
        </div>
    )
}

export default connect((state)=>({state}))(Dashboard)