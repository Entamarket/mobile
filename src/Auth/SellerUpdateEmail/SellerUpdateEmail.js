import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UseSellerUpdateEmail from "../../hooks/UseSellerUpdateEmail";
import LoadingModal from "../../UIComponents/LoadingModal";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import PasswordInput from "../../UIComponents/PasswordInput/PasswordInput";

const SellerUpdateEmail = () => {
  const [error, setUpdateInfo, sellerUpdateEmailHandler, isLoading, setError] =
    UseSellerUpdateEmail();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.signTextCon}>
          <Text style={styles.signInText}>Update Email</Text>
          <Text style={styles.signupText}>
            Change your Seller Email Address
          </Text>
        </View>

        {error.isVisible ? (
          <Error display={error.display} text={error.errText} />
        ) : null}

        <TextInputBox
          labelName="New Email Address"
          name="mail-outline"
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setUpdateInfo((prev) => {
              return {
                email: text,
                password: prev.password,
              };
            });
          }}
        />

        <PasswordInput
          labelName="Password"
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setUpdateInfo((prev) => {
              return {
                email: prev.email,
                password: text,
              };
            });
          }}
        />

        <ButtonPrimary
          value="Update Email"
          btnAction={sellerUpdateEmailHandler}
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
    marginVertical: 5,
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

export default SellerUpdateEmail;
