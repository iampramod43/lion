import React from 'react'
import './Signup.css'
function Signup() {
  return (
     <div className="signup">
      <div className="signup-section">
        <div className="signup-header">
          <div className="signup-label">Log In</div>
        </div>
        <div className="signup-inputs">
          <div className="signup-input">
            <input className="signup-inputInput" type="text" placeholder="Username" />
                  </div>
                  <div className="signup-input">
            <input className="signup-inputInput" type="text" placeholder="Email" />
                  </div>
                   <div className="signup-input">
            <input className="signup-inputInput" type="text" placeholder="Mobile Number" />
            </div>
          <div className="signup-input">
            <input className="signup-inputInput" type="password" placeholder="Password" />
            </div>
        </div>
        <div className="signup-buttons">
          <button className="signup-button">
           Sign Up
          </button>
          </div>
        </div>
    </div>
  )
}

export default Signup