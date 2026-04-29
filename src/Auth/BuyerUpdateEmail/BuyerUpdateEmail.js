import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UseBuyerUpdateEmail from "../../hooks/UseBuyerUpdateEmail";
import LoadingModal from "../../UIComponents/LoadingModal";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import PasswordInput from "../../UIComponents/PasswordInput/PasswordInput";

const BuyerUpdateEmail = () => {
  const [error, setUpdateInfo, buyerUpdateEmailHandler, isLoading, setError] =
    UseBuyerUpdateEmail();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.signTextCon}>
          <Text style={styles.signInText}>Update Email</Text>
          <Text style={styles.signupText}>Change your Buyer Email Address</Text>
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
          btnAction={buyerUpdateEmailHandler}
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
    // fontWeight: 900,
  },

  forgotText: {
    marginVertical: 10,
    // fontWeight: 600,
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

export default BuyerUpdateEmail;
