import AsyncStorage from "@react-native-async-storage/async-storage";

const userUpdater = async (value) => {
  return await AsyncStorage.setItem("isUser", value);
};

export default userUpdater;
