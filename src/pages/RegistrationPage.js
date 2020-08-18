import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import history from '../history'

function RegistrationPage({ state, dispatch }) {

    //Controlled inputs
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleRegister(e) {
        e.preventDefault()

        const newUser = {
            name: name,
            email: email,
            password: password
        }

        const configObj = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify(newUser)
        }

        fetch(`http://localhost:3000/therapists`, configObj)
            .then(resp => resp.json())
            .then(json => {
                dispatch({ type: "LOGIN", payload: json })
                localStorage.tokenId = `${json.token}${json.therapist.id}`
                history.push("/dashboard")

                if (history.location.pathname === "/dashboard") {window.location.reload(true)}
            })
    }

    return <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <input name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" />
            <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
            <input type="submit" />
        </form>
        <NavLink to="/login">Have an account?</NavLink>
    </div>
}

export default connect((state)=>({state}))(RegistrationPage)