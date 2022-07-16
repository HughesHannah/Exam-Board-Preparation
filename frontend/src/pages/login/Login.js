import React from "react";
import "./login.scss";

const Login = () => {
  return <div className="login">
    <form className="form">
      <input type="text" name="username" placeholder="Enter Username"/>
      <input type="password" name="password" placeholder="Enter Password"/>
      <input type="submit" />
    </form>
  </div>;
};

export default Login;
