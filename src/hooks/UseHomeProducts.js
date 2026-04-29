import { useState } from "react";
import entamarketApi from "../api/entamarketApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

let cachedHomeProducts = null;
let cartInitPromise = null;

async function ensureCartItemsInitialized() {
  if (cartInitPromise) return cartInitPromise;
  cartInitPromise = (async () => {
    const cartItems = await AsyncStorage.getItem("cartItems");
    if (cartItems === null) {
      await AsyncStorage.setItem("cartItems", JSON.stringify([]));
    }
  })();
  return cartInitPromise;
}

export default function () {
  const [results, setResults] = useState(() => {
    if (Array.isArray(cachedHomeProducts) && cachedHomeProducts.length) {
      return { products: cachedHomeProducts, loading: false, error: null };
    }
    return { products: [], loading: true, error: null };
  });

  const getHomeProducts = async (force = false) => {
    await ensureCartItemsInitialized();

    if (!force && Array.isArray(cachedHomeProducts) && cachedHomeProducts.length) {
      setResults({ products: cachedHomeProducts, loading: false, error: null });
      return;
    }

    setResults((prev) => ({
      products: force ? [] : prev.products ?? [],
      loading: true,
      error: null,
    }));

    try {
      const response = await entamarketApi.get(`/home-page?page=${0}`);
      const products = response?.data?.products ?? [];
      cachedHomeProducts = products;
      setResults({ products, loading: false, error: null });
    } catch (error) {
      const message =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load products.";
      setResults((prev) => ({
        products: prev.products ?? [],
        loading: false,
        error: message,
      }));
    }
  };

  return [results, getHomeProducts];
}
