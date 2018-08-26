import React from 'react';
import {startLogin} from '../../actions';

const Home = () => {
  const login = () => {
    startLogin();
  }
  return(
    <div className="home">
    <div className="app-name"><strong>ExpenseMate</strong></div>
    <div className="login-btn" onClick={()=>login()}><i className="fab fa-google"/> <strong>Login in with Google</strong></div>
    </div>
  )
}


export default Home;
