import AsyncStorage from "@react-native-async-storage/async-storage";

const isVerified = async (value) => {
  return await AsyncStorage.setItem("isVerified", value);
};

export default isVerified;
