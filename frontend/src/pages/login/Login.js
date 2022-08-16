import React, {useContext} from "react";
import "./login.scss";

import AuthContext from "../../context/AuthContext.js"

const Login = () => {
  let {loginUser} = useContext(AuthContext)
  return (<div className="login">
    <div className="mainContainer">
      <div className="logoTitle">Exam Board Preparation Page</div>
      <div className="loginBox">
        <form className="form" onSubmit={loginUser}>
          <div className="inputDiv">
            <input type="text" name="username" placeholder="Enter Username" className="inputBox"/>
          </div>
          <div className="inputDiv">
            <input type="password" name="password" placeholder="Enter Password" className="inputBox"/>
          </div>
          <div className="inputDiv">
            <input type="submit" className="loginButton"/>
          </div>
        </form>
        {/* <p className="forgotP">Forgot Password?</p> */}
      </div>
    </div>
    
    
  </div>);
};

export default Login;
