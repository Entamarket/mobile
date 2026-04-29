import { useState } from "react";
import entamarketApi from "../api/entamarketApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function () {
  const [results, setResults] = useState({
    products: [],
    loading: true,
    error: null,
  });

  const getHomeProducts = async () => {
    setResults({
      products: [],
      loading: true,
      error: null,
    });

    try {
      const response = await entamarketApi.get(`/home-page?page=${0}`);
      setResults({
        products: response?.data?.products ?? [],
        loading: false,
        error: null,
      });

      const cartItems = await AsyncStorage.getItem("cartItems");

      if (cartItems === null) {
        await AsyncStorage.setItem("cartItems", JSON.stringify([]));
      }
    } catch (error) {
      const message =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load products.";
      setResults({
        products: [],
        loading: false,
        error: message,
      });
    }
  };

  return [results, getHomeProducts];
}
