import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import entamarketApi from "../api/entamarketApi";
import setToken from "../utilities/tokenUpdater";
export default function UseSignUpErrorHandler() {
  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
    type: "",
  });
  const [signupInfo, setSignUpInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const signUpBuyerHandler = async (details) => {
    setIsLoading(true);
    try {
      await entamarketApi.post(`/buyer/signup`, details).then((resp) => {
        setToken(resp.data.entamarketToken);
        navigation.navigate("Otp");
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

  const signUpHandlerError = () => {
    if (signupInfo.firstName === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "First name required",
        type: "error",
      });
    } else if (signupInfo.lastName === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Last name required",
        type: "error",
      });
    } else if (signupInfo.email === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Email Address is required",
        type: "error",
      });
    } else if (signupInfo.password === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Set a Password to continue",
        type: "error",
      });
    } else if (signupInfo.username === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Username is required",
        type: "error",
      });
    } else if (signupInfo.phoneNumber === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Phone Number is required",
        type: "error",
      });
    } else {
      signUpBuyerHandler(signupInfo);
    }
  };

  return [error, setSignUpInfo, signUpHandlerError, isLoading, setError];
}
