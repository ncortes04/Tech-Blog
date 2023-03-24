import React from 'react'
import '../styles/nav.css'
import authService from '../utils/auth'

const Nav = () => {
  return (
        <div class="nav-header">
              <h1>
                <a href="/">TECHYS </a>
              </h1>
              <nav>
                {authService.loggedIn()
                ? <>
                  <a href="/profile">profile</a>
                  <a onClick={() => {authService.logout();}}>LOGOUT</a>
                  </>
                : <a href="/login">login</a>
              }    
              </nav>
        </div>  

  )
}

export default Nav