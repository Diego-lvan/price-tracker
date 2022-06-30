import React from "react";
import Axios from "axios";
import AuthLogin from "./AuthForm";
import { URL } from "../../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const login = async (e, email, pwd) => {
    e.preventDefault();
    try {
      const res = await Axios.post(`${URL}/api/auth/login`, { email, pwd });
      const token = res.data.accessToken;
      window.localStorage.setItem("token", token);
      navigate("/home", { replace: true });
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };
  return <AuthLogin title={"Login"} handleSubmit={login} />;
};

export default Login;
