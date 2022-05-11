import React from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate(); 
  const routeSignup = () => {
    let path = `/signup`;
    navigate(path);
  };
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = () => {
    let url = 'http://localhost:4500/api/tiger/v1/teacher_user/signin';
    let data = {
      email_id: username,
      password: password
    };
    // hit above url with axios
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.statusCode === 200) {
          console.log(localStorage.setItem('token', data.data.data._id));
          let path = `/home`;
          navigate(path);
        }
      });
  }
  return (
      <div className="login">
      <div className="login-section">
        <div className="login-header">
          <div className="login-label">Log In</div>
          <div className="login-signupText">
            Don't have an account? <span className="login-signupLink" onClick={routeSignup}>Create an account</span>
          </div>
        </div>
        <div className="login-inputs">
          <div className="login-input">
            <input className="login-inputInput" type="text" placeholder="Username" value={username}
                    onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="login-input">
            <input className="login-inputInput" type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>
        <div className="login-buttons">
          <button className="login-button" onClick={login}>
           Log In
          </button>
          </div>
        </div>
    </div>
  )
}

export default Login