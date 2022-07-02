import React, { useState, useEffect } from "react";
import ChartForm from "../components/Chart/ChartForm";
import ChartLine from "../components/Chart/Chart";

import axios from "axios";
import { URL } from "../config";

const Chart = () => {
  const [productID, setProductID] = useState("");
  const [productHistory, setProductHistory] = useState(null);

  const fetchHistoryPrices = async () => {
    if (!productID) return;
    try {
      const res = await axios.get(`${URL}/api/getHistory/${productID}`);
      const historyPrices = res.data.history;
      setProductHistory(historyPrices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistoryPrices();
  }, [productID]);
  return (
    <>
      <ChartForm productID={productID} setProductID={setProductID} />
      {productHistory && <ChartLine productHistory={productHistory} />}
    </>
  );
};

export default Chart;
