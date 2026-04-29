import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { HelperText } from "react-native-paper";
import useBuyerForgotPassword from "../../hooks/useBuyerForgotPassword";
import LoadingModal from "../../UIComponents/LoadingModal";
import { useState } from "react";

const BuyerSignin = () => {
  const [showPass, setShowPass] = useState(true);

  const [error, setResetData, resetPasswordErr, isLoading, setError] =
    useBuyerForgotPassword();

  const showPassHandler = () => {
    setShowPass(!showPass);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.signTextCon}>
          <Text style={styles.signInText}>Forgot Password ?</Text>
          <Text style={styles.signupText}>
            Reset the password to your Buyer Account
          </Text>
        </View>

        <HelperText
          type="error"
          visible={error.isVisible}
          style={{
            display: error.display,
            fontSize: 14,
          }}
        >
          {error.errText}
        </HelperText>

        <TextInput
          label="Email Address"
          mode="outlined"
          style={styles.TextInput}
          right={<TextInput.Icon icon="email" size={17} />}
          onChangeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setResetData((prev) => {
              return {
                email: text,
                newPassword: prev.newPassword,
              };
            });
          }}
        />

        <TextInput
          label="New Password"
          secureTextEntry={showPass}
          mode="outlined"
          style={styles.TextInput}
          right={
            <TextInput.Icon icon="eye" size={17} onPress={showPassHandler} />
          }
          onChangeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setResetData((prev) => {
              return {
                email: prev.email,
                newPassword: text,
              };
            });
          }}
        />

        <Button
          mode="contained"
          style={styles.buttonStyle}
          onPress={resetPasswordErr}
        >
          <Text style={{ fontSize: 14 }}>Reset Password</Text>
        </Button>
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
  signInText: {
    fontSize: 26,
    fontWeight: "700",
  },
  buttonStyle: {
    marginVertical: 13,
    justifyContent: "center",
    height: 55,
  },
  TextInput: {
    marginVertical: 10,
    height: 55,
    fontSize: 15,
  },
  forgotText: {
    marginVertical: 10,
    fontWeight: "500",
  },
  formContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  signupText: {
    fontSize: 14,
    marginBottom: 10,
  },
  signTextCon: {
    alignItems: "center",
  },
});

export default BuyerSignin;
