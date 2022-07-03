import React, { useState, useEffect } from "react";
import ChartForm from "../components/Chart/ChartForm";
import ChartLine from "../components/Chart/Chart";

import axios from "axios";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";
const Chart = () => {
  const [productID, setProductID] = useState("");
  const [productHistory, setProductHistory] = useState(null);
  const navigate = useNavigate();

  const fetchHistoryPrices = async () => {
    if (!productID) return;
    try {
      const res = await axios.get(`${URL}/api/getHistory/${productID}`);
      const historyPrices = res.data.history;
      setProductHistory(historyPrices);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/", { replace: true });
      }
    }
  };

  useEffect(() => {
    fetchHistoryPrices();
  }, [productID]);
  return (
    <>
      <ChartForm productID={productID} setProductID={setProductID} />
      {productHistory && <ChartLine productHistory={productHistory} />}
      {productID && (
        <a target="_blank" href={`https://www.amazon.com/dp/${productID}`}>
          https://www.amazon.com/dp/{productID}
        </a>
      )}
    </>
  );
};

export default Chart;
