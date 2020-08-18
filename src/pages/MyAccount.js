import React from 'react'
import { connect } from 'react-redux'

function MyAccount({ state, dispatch }) {

    return (
        <div>
            <h1>My Account</h1>
        </div>
    )
}

export default connect((state)=>({state}))(MyAccount)