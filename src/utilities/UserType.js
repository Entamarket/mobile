import AsyncStorage from "@react-native-async-storage/async-storage";

const userType = async (value) => {
  return await AsyncStorage.setItem("userType", value);
};

export default userType;
