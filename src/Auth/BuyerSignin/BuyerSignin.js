import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import useSignInHandler from "../../hooks/useSignInHandler";
import LoadingModal from "../../UIComponents/LoadingModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import PasswordInput from "../../UIComponents/PasswordInput/PasswordInput";
import TextSign from "../../UIComponents/TextSign/TextSign";

const BuyerSignin = () => {
  const navigation = useNavigation();
  const [error, setSignInData, signinErrHandler, isLoading, setError] =
    useSignInHandler();
  const navigateToBuyerSignUp = () => {
    navigation.navigate("BuyerSignUp");
  };
  const navigateToPasswordReset = () => {
    navigation.navigate("buyerResetPassword");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.signTextCon}>
          <Text style={styles.signInText}>Buyer Sign In</Text>
          <Text style={styles.signupText}>Signin to your Buyer Account</Text>
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
          textAction={navigateToBuyerSignUp}
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

export default BuyerSignin;
