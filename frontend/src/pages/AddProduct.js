import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productURL, setProductURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const token = window.localStorage.getItem("token");
      const res = await axios.post(`${URL}/api/product`, { url: productURL }, { headers: { Authorization: token } });
      setErrorMessage("");
      setSuccessMessage("Product added succesfully");
      setInterval(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/", { replace: true });
      }
      setSuccessMessage("");
      setErrorMessage("Wrong URL format");
      setInterval(() => {
        setErrorMessage("");
      }, 3000);
    }
  };
  return (
    <div>
      <h2>Add Product</h2>
      <span style={{ color: "red" }}>{errorMessage}</span>
      <span style={{ color: "green" }}>{successMessage}</span>
      <Form onSubmit={addProduct}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product's URL (Amazon)</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://www.amazon.com/Logitech-MK270-Wireless-Keyboard-Mouse/dp/B079JLY5M5/ref=lp_16225007011_1_8"
            onChange={(e) => setProductURL(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
