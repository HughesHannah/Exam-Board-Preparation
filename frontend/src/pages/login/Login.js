import React, {useContext} from "react";
import "./login.scss";

import AuthContext from "../../context/AuthContext.js"

const Login = () => {
  let loginUser = useContxt(AuthContext)
  return <div className="login">
    <form className="form" onSubmit={loginUser}>
      <input type="text" name="username" placeholder="Enter Username"/>
      <input type="password" name="password" placeholder="Enter Password"/>
      <input type="submit" />
    </form>
  </div>;
};

export default Login;
