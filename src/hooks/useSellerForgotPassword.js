import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import entamarketApi from "../api/entamarketApi";
import setToken from "../utilities/tokenUpdater";

export default function useSellerForgotPassword() {
  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
    type: "",
  });

  const [resetData, setResetData] = useState({
    email: "",
    newPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const resetPasswordHandler = async (details) => {
    setIsLoading(true);

    try {
      await entamarketApi
        .put(`/trader/get-new-password`, details)
        .then((resp) => {
          setToken(resp.data.entamarketToken);
          navigation.navigate("resetSellerOtp");
          setIsLoading(false);
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

  const resetPasswordErr = () => {
    if (resetData.email === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Email is required",
        type: "error",
      });
    } else if (resetData.newPassword === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "New Password is required",
        type: "error",
      });
    } else {
      resetPasswordHandler(resetData);
    }
  };

  return [error, setResetData, resetPasswordErr, isLoading, setError];
}
