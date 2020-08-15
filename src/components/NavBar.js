import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function NavBar({ state }) {
    return (
        <div className="navbar">
            {state.auth.token ? 
                <React.Fragment >
                    <NavLink className="navlink" to="/dashboard">Dashboard</NavLink>
                    <NavLink className="navlink" to="/account">My Account</NavLink>
                    <NavLink className="navlink" to="/logout">Logout</NavLink>
                </React.Fragment>

            : 
                <React.Fragment>
                    <NavLink className="navlink" to="/login">Login</NavLink>
                    <NavLink className="navlink" to="/register">Register</NavLink>
                </React.Fragment>
            }
        </div>
    )
}

export default connect((state)=>({state}))(NavBar)