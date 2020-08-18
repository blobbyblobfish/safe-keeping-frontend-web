import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import history from '../history'

function LoginPage({ state, dispatch }) {

    //Controlled inputs
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(e) {
        e.preventDefault()

        const credentials = {
            email: email,
            password: password
        }

        const configObj = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify(credentials)
        }

        fetch(`http://localhost:3000/therapists/login`, configObj)
            .then(resp => resp.json())
            .then(json => {
                if (json.token) {
                    console.log(json)
                    dispatch({ type: "LOGIN", payload: json })
                    localStorage.tokenId = `${json.token}${json.therapist.id}`
                    history.push("/dashboard")

                    // if (history.location.pathname === "/dashboard") {window.location.reload(true)}
                }
            })
        
    }

    return <div>
        <h1>Welcome</h1>
        <form onSubmit={handleLogin}>
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" />
            <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
            <input type="submit" />
        </form>
        <NavLink to="/register">Don't have an account?</NavLink>
    </div>
}

export default connect((state)=>({state}))(LoginPage)