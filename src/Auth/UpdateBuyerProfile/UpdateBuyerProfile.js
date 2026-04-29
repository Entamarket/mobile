import { StyleSheet, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneInput from "react-native-phone-number-input";

import baseColors from "../../common/baseColors";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import LoadingModal from "../../UIComponents/LoadingModal";
import UseUpdateBuyerProfile from "../../hooks/UseUpdateBuyerprofile";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";

const UpdateBuyerProfile = () => {
  const userData = useSelector((state) => state.isLoggedIn.userData);
  const [
    error,
    updateInfo,
    setUpdateInfo,
    updateInfoErrHandler,
    isLoading,
    setError,
  ] = UseUpdateBuyerProfile();
  const phoneVal = userData.phoneNumber;
  const phoneData = phoneVal.split("-")[1];
  const [value, setValue] = useState(phoneData);
  const phoneInput = useRef("Phone");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <View style={styles.signTextCon}>
          <Text style={styles.signInText}>Update Buyer Profile</Text>
          <Text style={styles.signupText}>Change your Buyer Information</Text>
        </View>

        {error.isVisible ? (
          <Error display={error.display} text={error.errText} />
        ) : null}

        <TextInputBox
          name="person-outline"
          value={updateInfo.firstName}
          labelName="First Name"
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setUpdateInfo((prev) => {
              return {
                firstName: text,
                lastName: prev.lastName,
                username: prev.username,
                phoneNumber: prev.phoneNumber,
              };
            });
          }}
        />

        <TextInputBox
          labelName="Last Name"
          name="person-outline"
          value={updateInfo.lastName}
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setUpdateInfo((prev) => {
              return {
                firstName: prev.firstName,
                lastName: text,
                username: prev.username,
                phoneNumber: prev.phoneNumber,
              };
            });
          }}
        />

        <TextInputBox
          labelName="Username"
          name="at"
          value={updateInfo.username}
          autoCorrect={false}
          changeText={(text) => {
            setError({ isVisible: false, display: "none", errText: "" });
            setUpdateInfo((prev) => {
              return {
                firstName: prev.firstName,
                lastName: prev.lastName,
                username: text,
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

            setUpdateInfo((prev) => {
              return {
                firstName: prev.firstName,
                lastName: prev.lastName,
                username: prev.username,
                phoneNumber: text,
              };
            });
          }}
        />

        <ButtonPrimary btnAction={updateInfoErrHandler} value="Update" />
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
    fontSize: 22,
    // fontWeight: 900,
  },
  buttonStyle: {
    marginVertical: 10,
    justifyContent: "center",
    height: 50,
  },
  TextInput: {
    marginVertical: 5,
    alignContent: "center",
    justifyContent: "center",
  },
  formContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
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
    marginTop: 10,
  },
  inpStyle: {
    backgroundColor: baseColors.lightWhite,
    fontSize: 14,
  },
});

export default UpdateBuyerProfile;
