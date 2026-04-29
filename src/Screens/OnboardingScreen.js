import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import slides from "../common/slides";
import AppIntroSlider from "react-native-app-intro-slider";
import baseColors from "../../src/common/baseColors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { SliceActions } from "../Slice/Auth-Slice";

const OnboardingScreen = ({ setLoggedIn }) => {
  const { width, height } = Dimensions.get("screen");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const setAuth = async () => {
    try {
      await AsyncStorage.setItem("isAuth", "loggedIn").then(() => {
        dispatch(SliceActions.loginAuth(true));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setAuthSeller = () => {
    navigation.navigate("SellerSignUp");
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={({ item }) => {
        return (
          <SafeAreaView style={styles.container}>
            <Text style={styles.textTitle}>{item.title}</Text>
            <Image
              source={item.image}
              style={{ width: width - 80, height: 350 }}
              resizeMode="contain"
            />
            <Text>{item.text}</Text>

            <View style={styles.btnContainers}>
              <TouchableOpacity
                style={[styles.btn, styles.btnColor1]}
                onPress={() => setAuth()}
              >
                <Text style={styles.textColor}>Buyer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.btnColor2]}
                onPress={() => setAuthSeller()}
              >
                <Text>Seller</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      }}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainers: {
    flexDirection: "row",
    margin: 40,
  },
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
  btnColor1: {
    backgroundColor: baseColors.primaryColor,
    marginRight: 20,
    color: "#fff",
  },
  textTitle: {
    fontSize: 23,
    color: baseColors.primaryColor,
    fontWeight: "900",
  },
  btnColor2: {
    backgroundColor: "white",
    borderColor: baseColors.primaryColor,
    borderWidth: 1,
  },
  textColor: {
    color: "#fff",
  },
});

export default OnboardingScreen;
