import entamarketApi from "../api/entamarketApi";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SliceActions } from "../Slice/Auth-Slice";
import { useDispatch } from "react-redux";

export default function () {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    user: "",
    isUser: false,
  });

  const getUserData = async () => {
    const token = await AsyncStorage.getItem("entamarketToken");

    const header = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    };
    try {
      await entamarketApi.get("/user/get-user", header).then((resp) => {
        setUserInfo({
          user: resp.data.userData,
          isUser: true,
        });
        dispatch(SliceActions.setUserData(resp.data.userData));
      });
    } catch (error) {
      if (error.response.data.msg === "Unauthorized") {
        await AsyncStorage.removeItem("entamarketToken");
        dispatch(SliceActions.setUserData(false));
        setUserInfo({
          user: null,
          isUser: false,
        });
      }
    }
  };

  return [getUserData, userInfo];
}
