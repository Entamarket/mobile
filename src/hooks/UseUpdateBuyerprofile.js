import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import entamarketApi from "../api/entamarketApi";
import setToken from "../utilities/tokenUpdater";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UseUpdateBuyerProfile() {
  const userData = useSelector((state) => state.isLoggedIn.userData);

  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
  });
  const [updateInfo, setUpdateInfo] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    phoneNumber: userData.phoneNumber,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const updateBuyerInfoHandler = async (details) => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("entamarketToken");

    const header = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    };

    try {
      await entamarketApi
        .put(`/buyer/dashboard/update-profile`, details, header)
        .then((resp) => {
          setToken(resp.data.entamarketToken);
          navigation.navigate("BuyerProfile");
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

  const updateInfoErrHandler = () => {
    if (updateInfo.firstName === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "First name required!",
      });
    } else if (updateInfo.lastName === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Last name required!",
      });
    } else if (updateInfo.username === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Username is required!",
      });
    } else if (updateInfo.phoneNumber === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Phone Number is required!",
      });
    } else {
      updateBuyerInfoHandler(updateInfo);
    }
  };

  return [
    error,
    updateInfo,
    setUpdateInfo,
    updateInfoErrHandler,
    isLoading,
    setError,
  ];
}
