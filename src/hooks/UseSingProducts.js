import { useState } from "react";
import entamarketApi from "../api/entamarketApi";

export default function () {
  const [results, setResults] = useState({
    product: null,
    loading: true,
    error: null,
  });

  const getSingleProducts = async (id) => {
    setResults({
      product: null,
      loading: true,
      error: null,
    });

    try {
      const response = await entamarketApi.get(
        `/product/get-product?productID=${id}`
      );
      setResults({
        product: response.data.productData,
        loading: false,
        error: null,
      });
    } catch (error) {
      setResults({
        product: null,
        loading: false,
        error: error.msg,
      });
    }
  };

  return [results, getSingleProducts];
}
