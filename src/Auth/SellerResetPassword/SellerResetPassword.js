import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useSellerResetPassword from "../../hooks/UseSellerResetPassword";
import LoadingModal from "../../UIComponents/LoadingModal";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";
import PasswordInput from "../../UIComponents/PasswordInput/PasswordInput";

const BuyerResetPassword = () => {
  const [error, setUpdateInfo, resetPasswordhandler, isLoading, setError] =
    useSellerResetPassword();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.signTextCon}>
          <Text style={styles.signInText}>Reset Password</Text>
          <Text style={styles.signupText}>Update your Seller Password</Text>
        </View>

        {error.isVisible ? (
          <Error display={error.display} text={error.errText} />
        ) : null}

        <PasswordInput
          labelName="Old Password"
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setUpdateInfo((prev) => {
              return {
                oldPassword: text,
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
            });
            setUpdateInfo((prev) => {
              return {
                oldPassword: prev.oldPassword,
                newPassword: text,
              };
            });
          }}
        />

        <ButtonPrimary
          value="Reset Password"
          btnAction={resetPasswordhandler}
        />
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

export default BuyerResetPassword;
