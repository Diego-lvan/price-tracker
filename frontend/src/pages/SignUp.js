import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import axios from "axios";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();

  const signUp = async (e, email, pwd, name) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/api/auth/register`, { email, pwd, name });
      const token = res?.data?.accessToken;
      if (token) {
        window.localStorage.setItem("token", token);
        navigate("/addProduct");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return <AuthForm title={"SignUp"} showNameField={true} handleSubmit={signUp} />;
};

export default SignUp;
