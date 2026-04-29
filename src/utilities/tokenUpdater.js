import AsyncStorage from "@react-native-async-storage/async-storage";

const setToken = async (token) => {
  return await AsyncStorage.setItem("entamarketToken", token);
};

export default setToken;
