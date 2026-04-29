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
    oldPassword: "",
    newPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const buyerResetPassword = async (details) => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("entamarketToken");

    const header = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    };

    try {
      await entamarketApi
        .put(`/buyer/dashboard/update-password`, details, header)
        .then((resp) => {
          setToken(resp.data.entamarketToken);
          navigation.navigate("ResetPassword");
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

  const resetPasswordhandler = () => {
    if (updateInfo.oldPassword === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Old Password is required",
      });
    } else if (updateInfo.newPassword === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "New Password is required",
      });
    } else {
      buyerResetPassword(updateInfo);
    }
  };

  return [error, setUpdateInfo, resetPasswordhandler, isLoading, setError];
}
