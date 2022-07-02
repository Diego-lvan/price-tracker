import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { URL } from "../../config";

const ChartForm = ({ setProductID }) => {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyProducts = async () => {
    const res = await axios.get(`${URL}/api/getMyProducts`);
    setMyProducts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getMyProducts();
  }, []);

  if (loading) return <h1>loading</h1>;
  return (
    <>
      <Form.Select onChange={(e) => setProductID(e.target.value)}>
        <option>Select product</option>
        {myProducts.map(({ Product }) => {
          const { productID, title } = Product;
          return (
            <option value={productID} key={productID}>
              {title}
            </option>
          );
        })}
      </Form.Select>
    </>
  );
};

export default ChartForm;
