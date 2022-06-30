import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import axios from "axios";
import { URL } from "../config";

const SignUp = () => {
  const signUp = async (e, email, pwd, name) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/api/auth/register`, { email, pwd, name });
    } catch (error) {
      console.log(error);
    }
  };
  return <AuthForm title={"SignUp"} showNameField={true} handleSubmit={signUp} />;
};

export default SignUp;
