import React from 'react'
import { connect } from 'react-redux'

function MyAccount({ state, dispatch }) {

    return (
        <div className="row">
            <h2>My Account</h2>
        </div>
    )
}

export default connect((state)=>({state}))(MyAccount)