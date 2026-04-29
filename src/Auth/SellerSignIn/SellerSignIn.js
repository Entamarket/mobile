import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useSellerSignInHandler from "../../hooks/UseSellerSignIn";
import LoadingModal from "../../UIComponents/LoadingModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import PasswordInput from "../../UIComponents/PasswordInput/PasswordInput";
import TextSign from "../../UIComponents/TextSign/TextSign";

const SellerSignIn = () => {
  const navigation = useNavigation();
  const [error, setSignInData, signinErrHandler, isLoading, setError] =
    useSellerSignInHandler();

  const navigateToSellerSignUp = () => {
    navigation.navigate("SellerSignUp");
  };

  const navigateToPasswordReset = () => {
    navigation.navigate("sellerForgotPass");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.signTextCon}>
          <Text style={styles.signInText}>Seller Sign In</Text>
          <Text style={styles.signupText}>Signin to your Seller Account</Text>
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
            setSignInData((prev) => {
              return {
                id: text,
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
              type: "",
            });
            setSignInData((prev) => {
              return {
                id: prev.id,
                password: text,
              };
            });
          }}
        />

        <TouchableOpacity onPress={navigateToPasswordReset}>
          <View>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </View>
        </TouchableOpacity>

        <ButtonPrimary value="Sign In" btnAction={signinErrHandler} />

        <TextSign
          signText1="Don't have an account"
          signText2="Sign up"
          textAction={navigateToSellerSignUp}
        />
      </ScrollView>

      {isLoading ? <LoadingModal visible={isLoading} /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 6 : 14,
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  signupText: {
    fontSize: 14,
    marginBottom: 10,
  },
  signTextCon: {
    alignItems: "center",
  },
});

export default SellerSignIn;
