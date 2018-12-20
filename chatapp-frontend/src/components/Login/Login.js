import React from 'react'
import './Login.css'

const login = props => (
    <div className="loginBox">   
      <p> Login and start chatting</p>
      <form>
            <label for="username" className="inputLabel ">Username</label>
            <input type="text" id="username" className="inputElement" value="enter login" />
      </form>
    </div>
)

export default login