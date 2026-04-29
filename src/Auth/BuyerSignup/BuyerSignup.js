import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import baseColors from "../../common/baseColors";
import { useNavigation } from "@react-navigation/native";
import UseSignUpErrorHandler from "../../hooks/UseSignUpErrorHandler";
import { useState, useRef } from "react";
import LoadingModal from "../../UIComponents/LoadingModal";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import PasswordInput from "../../UIComponents/PasswordInput/PasswordInput";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";
import TextSign from "../../UIComponents/TextSign/TextSign";

const BuyerSignup = () => {
  const [error, setSignUpInfo, signUpHandlerError, isLoading, setError] =
    UseSignUpErrorHandler();
  const [value, setValue] = useState();
  const phoneInput = useRef("Phone");
  const navigation = useNavigation();

  const navigateHandler = () => {
    navigation.navigate("BuyerSignIn");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
        <View style={styles.signTextCon}>
          <Text style={styles.signInText}>Buyer Sign Up</Text>
          <Text style={styles.signupText}>Signup for a buyer account</Text>
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
          labelName="First Name"
          name="person-outline"
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setSignUpInfo((prev) => {
              return {
                firstName: text,
                lastName: prev.lastName,
                email: prev.email,
                password: prev.password,
                username: prev.username,
                phoneNumber: prev.phoneNumber,
              };
            });
          }}
        />

        <TextInputBox
          labelName="Last Name"
          name="person-outline"
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setSignUpInfo((prev) => {
              return {
                firstName: prev.firstName,
                lastName: text,
                email: prev.email,
                password: prev.password,
                username: prev.username,
                phoneNumber: prev.phoneNumber,
              };
            });
          }}
        />

        <TextInputBox
          labelName="Username"
          name="at"
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setSignUpInfo((prev) => {
              return {
                firstName: prev.firstName,
                lastName: prev.lastName,
                email: prev.email,
                password: prev.password,
                username: text,
                phoneNumber: prev.phoneNumber,
              };
            });
          }}
        />

        <TextInputBox
          labelName="Email Address"
          name="mail-outline"
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setSignUpInfo((prev) => {
              return {
                firstName: prev.firstName,
                lastName: prev.lastName,
                email: text,
                password: prev.password,
                username: prev.username,
                phoneNumber: prev.phoneNumber,
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
            setSignUpInfo((prev) => {
              return {
                firstName: prev.firstName,
                lastName: prev.lastName,
                email: prev.email,
                password: text,
                username: prev.username,
                phoneNumber: prev.phoneNumber,
              };
            });
          }}
        />

        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="NG"
          layout="first"
          containerStyle={styles.inputWidth}
          textContainerStyle={styles.inpStyle}
          onChangeText={(text) => {
            setValue(text);
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            const countryCode = phoneInput.current.state.code;
            let phoneNum = `+${countryCode}-${text}`;

            if (phoneNum === `+${countryCode}-`) {
              setSignUpInfo((prev) => {
                return {
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  email: prev.email,
                  password: prev.password,
                  username: prev.username,
                  phoneNumber: "",
                };
              });
            } else {
              setSignUpInfo((prev) => {
                return {
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  email: prev.email,
                  password: prev.password,
                  username: prev.username,
                  phoneNumber: `+${countryCode}-${text}`,
                };
              });

              phoneNum = `+${countryCode}-`;
            }
          }}
        />

        <ButtonPrimary value="Sign Up" btnAction={signUpHandlerError} />
        <TextSign
          signText1="Already have an account"
          signText2="Sign in"
          textAction={navigateHandler}
        />
        </ScrollView>
      </KeyboardAvoidingView>

      {isLoading ? <LoadingModal visible={isLoading} /> : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 12,
  },
  signInText: {
    fontSize: 22,
    fontWeight: "700",
  },
  buttonStyle: {
    marginVertical: 10,
    justifyContent: "center",
    height: 50,
  },
  formContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  signupText: {
    fontSize: 14,
    marginBottom: 14,
  },
  signTextCon: {
    alignItems: "center",
  },
  heading2: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  CreateText: {
    alignItems: "center",
  },
  createAcct: {
    color: baseColors.hoverColor,
  },
  heading3: {
    fontSize: 15,
    fontWeight: "500",
  },
  inputWidth: {
    width: "100%",
    backgroundColor: baseColors.lightWhite,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 3,
    marginVertical: 5,
  },
  inpStyle: {
    backgroundColor: baseColors.lightWhite,
    fontSize: 14,
  },
});

export default BuyerSignup;
