import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useState } from "react";
import baseColors from "../../common/baseColors";
import LoadingModal from "../../UIComponents/LoadingModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import entamarketApi from "../../api/entamarketApi";
import { useNavigation } from "@react-navigation/native";
import setToken from "../../utilities/tokenUpdater";

const Otp = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState({
    otp: "",
  });
  const [error, setError] = useState({
    isVisible: true,
    display: "none",
    errText: "",
  });

  const verifyOtp = async () => {
    const token = await AsyncStorage.getItem("entamarketToken");

    if (token) {
      if (otp.otp === "") {
        setError({
          isVisible: true,
          display: "flex",
          errText: "Please enter a valid OTP",
        });
      } else {
        setIsLoading(true);

        await entamarketApi
          .put("/buyer/dashboard/verify-update-otp", otp, {
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json",
          })
          .then((resp) => {
            setToken(resp.data.entamarketToken);
            navigation.navigate("Account");
          })
          .catch((err) => {
            setIsLoading(false);
            setToken(err.response.data.entamarketToken);
            setError({
              isVisible: true,
              display: "flex",
              errText: err.response.data.msg,
            });
          });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.OtpContainer}>
        <View style={styles.otpTextCon}>
          <Text style={styles.otpText1}>OTP Verification</Text>
          <Text style={styles.otptext2}>
            An OTP was sent to your Email Address, Please check your Mail Inbox,
            also Check your Spam
          </Text>
        </View>

        <HelperText
          type="error"
          visible={error.isVisible}
          style={{ display: error.display, fontSize: 14 }}
        >
          {error.errText}
        </HelperText>

        <View style={styles.otpBox}>
          <TextInput
            mode="outlined"
            placeholder="Enter OTP Code"
            keyboardType="numeric"
            onChangeText={(text) => {
              setError({
                isVisible: false,
                display: "none",
                errText: "",
              });
              setOtp({
                otp: text,
              });
            }}
          />

          <Button
            mode="contained"
            style={styles.buttonStyle}
            onPress={verifyOtp}
          >
            <Text style={{ fontSize: 14 }}>Verify OTP</Text>
          </Button>
        </View>
      </View>

      {isLoading ? <LoadingModal visible={isLoading} /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  otpTextCon: {
    alignItems: "center",
  },
  OtpContainer: {
    padding: 20,
    marginTop: 5,
  },
  otpText1: {
    fontSize: 24,
    fontWeight: "700",
  },
  buttonStyle: {
    marginVertical: 10,
    justifyContent: "center",
    height: 50,
  },
  otptext2: {
    fontSize: 14,
    marginBottom: 20,
  },
  otpResend: {
    marginTop: 30,
    fontWeight: "400",
    fontSize: 15,
  },
  resendText: {
    color: baseColors.hoverColor,
    fontWeight: "500",
  },
});

export default Otp;
