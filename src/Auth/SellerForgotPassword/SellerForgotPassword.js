import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import LoadingModal from "../../UIComponents/LoadingModal";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import PasswordInput from "../../UIComponents/PasswordInput/PasswordInput";
import useSellerForgotPassword from "../../hooks/useSellerForgotPassword";

const SellerForgotPassword = () => {
  const [error, setResetData, resetPasswordErr, isLoading, setError] =
    useSellerForgotPassword();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.signTextCon}>
          <Text style={styles.signInText}>Forgot Password? </Text>
          <Text style={styles.signupText}>
            Reset your seller Account Password
          </Text>
        </View>

        {error.isVisible ? (
          <Error
            display={error.display}
            text={error.errText}
            type={error.type}
            closeError={() => {
              setError({
                isVisible: false,
                display: "none",
                errText: "",
                type: "",
              });
            }}
          />
        ) : null}

        <TextInputBox
          labelName="Email Address"
          name="mail-outline"
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
              type: "",
            });
            setResetData((prev) => {
              return {
                email: text,
                newPassword: prev.newPassword,
              };
            });
          }}
        />

        <PasswordInput
          labelName="New Password"
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
              type: "",
            });

            setResetData((prev) => {
              return {
                email: prev.email,
                newPassword: text,
              };
            });
          }}
        />

        <ButtonPrimary value="Reset Password" btnAction={resetPasswordErr} />
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

export default SellerForgotPassword;
