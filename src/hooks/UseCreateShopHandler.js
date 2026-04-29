import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import entamarketApi from "../api/entamarketApi";
import setToken from "../utilities/tokenUpdater";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UseCreateShopHandler() {
  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
    isModal: false,
  });
  const [shopData, setShopData] = useState({
    name: "",
    shopAddress: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const navigation = useNavigation();

  const setCreateShopHandler = async (details) => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("entamarketToken");
    const header = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    };
    try {
      await entamarketApi
        .post(`/shop/create-shop`, details, header)
        .then((resp) => {
          setToken(resp.data.entamarketToken);
          setIsModal(false);
          setIsLoading(false);
          navigation.navigate("shopNav", { status: "" });
        });
    } catch (error) {
      if (error.response.data.entamarketToken) {
        setError({
          isVisible: true,
          display: "flex",
          errText: error.response.data.msg,
          isModal: true,
        });
        setToken(error.response.data.entamarketToken);
        setIsLoading(false);
      } else {
        setError({
          isVisible: true,
          display: "flex",
          errText: error.response.data.msg,
          isModal: true,
        });
        setIsLoading(false);
      }
    }
  };

  const createShopErrorHandler = () => {
    if (shopData.name === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Shop name is required",
        isModal: true,
      });
    } else if (shopData.shopAddress === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Shop address is required",
        isModal: true,
      });
    } else {
      setCreateShopHandler(shopData);
    }
  };
  return [
    error,
    setShopData,
    createShopErrorHandler,
    isLoading,
    setError,
    isModal,
    setIsModal,
  ];
}
