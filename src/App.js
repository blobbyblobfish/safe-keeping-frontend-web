import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import Dashboard from './pages/Dashboard'
import MyAccount from './pages/MyAccount'

import history from './history'
// import logo from './logo.svg'
import './App.css'

function App( { state, dispatch } ) {

  //Utility
  console.log("IN APP ROOT", state)

  useEffect(() => {
    if (localStorage.tokenId && !state.auth.token) {
      
      const id = localStorage.tokenId.slice(89)

      fetch(`http://localhost:3000/therapists/${id}`)
        .then(resp => resp.json())
        .then(json => {
          dispatch({ type: "LOGIN_WITH_TOKEN", payload: json })
        })
    }

    if (!localStorage.tokenId) {
      history.push("/login")
    }

  }, []) 

  function renderRegistrationPage() {
    return <RegistrationPage />
  }

  function renderLoginPage() {
    return <LoginPage />
  }

  function renderDashboard() {
    return <Dashboard />
  }

  function renderMyAccount() {
    return <MyAccount />
  }

  function handleLogout() {
      localStorage.tokenId = ''
      dispatch({type: "LOGOUT"})
  }
    
  return (
    <div className="App">
      <header className="App-header">
        <h1>Safe Keeping</h1>
      </header>
      <NavBar />
      <Route path='/login' render={renderLoginPage} />
      <Route path='/register' render={renderRegistrationPage} />
      <Route path="/logout" render={handleLogout} />
      <Route path='/dashboard' render={renderDashboard} />
      <Route path='/account' render={renderMyAccount} />
    </div>
  )
}

const appWithRouter = withRouter(App)
export default connect((state)=>({state}))(appWithRouter)
