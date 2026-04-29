import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import entamarketApi from "../api/entamarketApi";
import setToken from "../utilities/tokenUpdater";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useSignInHandler() {
  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
  });
  const [updateInfo, setUpdateInfo] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const sellerUpdateInfo = async (details) => {
    setIsLoading(true);

    const token = await AsyncStorage.getItem("entamarketToken");

    const header = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    };

    try {
      await entamarketApi
        .put(`/trader/dashboard/update-email`, details, header)
        .then((resp) => {
          setToken(resp.data.entamarketToken);
          navigation.navigate("sellerVerifyOTP");
          setIsLoading(false);
        });
    } catch (error) {
      if (error.response.data.msg) {
        setToken(error.response.data.entamarketToken);
        setError({
          isVisible: true,
          display: "flex",
          errText: error.response.data.msg,
        });
        setIsLoading(false);
      }
    }
  };

  const sellerUpdateEmailHandler = () => {
    if (updateInfo.email === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Email is required",
      });
    } else if (updateInfo.password === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Password is required",
      });
    } else {
      sellerUpdateInfo(updateInfo);
    }
  };

  return [error, setUpdateInfo, sellerUpdateEmailHandler, isLoading, setError];
}
