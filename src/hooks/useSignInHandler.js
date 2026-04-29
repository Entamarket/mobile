import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import entamarketApi from "../api/entamarketApi";
import setToken from "../utilities/tokenUpdater";

export default function useSignInHandler() {
  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
    type: "error",
  });
  const [signInData, setSignInData] = useState({
    id: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const signinBuyerHandler = async (details) => {
    setIsLoading(true);
    try {
      await entamarketApi.put(`/buyer/login`, details).then((resp) => {
        setToken(resp.data.entamarketToken);
        setIsLoading(false);
        navigation.navigate("Home");
      });
    } catch (error) {
      if (error.response.data.msg) {
        setError({
          isVisible: true,
          display: "flex",
          errText: error.response.data.msg,
          type: "error",
        });
        setIsLoading(false);
      }
    }
  };

  const signinErrHandler = () => {
    if (signInData.id === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Email is required",
        type: "error",
      });
    } else if (signInData.password === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Password is required",
        type: "error",
      });
    } else {
      signinBuyerHandler(signInData);
    }
  };

  return [error, setSignInData, signinErrHandler, isLoading, setError];
}
