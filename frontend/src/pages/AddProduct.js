import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { URL } from "../config";
const AddProduct = () => {
  const [productURL, setProductURL] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    console.log(token);
    const res = await axios.post(`${URL}/api/product`, { url: productURL }, { headers: { Authorization: token } });
    console.log(res.data);
  };
  return (
    <div>
      <h2>Add Product</h2>
      <Form onSubmit={addProduct}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product's URL (Amazon)</Form.Label>
          <Form.Control type="text" placeholder="" onChange={(e) => setProductURL(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
