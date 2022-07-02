import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/navbar/Navbar";
import Chart from "./pages/Chart";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/addProduct" element={<AddProduct />} />
          <Route exact path="/chart" element={<Chart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
