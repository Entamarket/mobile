import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";
import UseCreateShopHandler from "../../hooks/UseCreateShopHandler";
import LoadingModal from "../../UIComponents/LoadingModal";

const CreateShopNav = (props) => {
  const [
    error,
    setShopData,
    createShopErrorHandler,
    isLoading,
    setError,
    isModal,
    setIsModal,
  ] = UseCreateShopHandler();

  return (
    <View style={styles.createShopBox}>
      <Text style={styles.textVirt}>
        Create a Virtual Shop to upload your products.
      </Text>

      {error.isVisible ? <Error text={error.errText} /> : null}

      <TextInputBox
        labelName="Shop Name"
        name="md-home-outline"
        changeText={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });
          setShopData((prev) => {
            return {
              name: text,
              shopAddress: prev.shopAddress,
            };
          });
        }}
      />
      <TextInputBox
        labelName="Shop Address"
        name="ios-location-outline"
        changeText={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });
          setShopData((prev) => {
            return {
              name: prev.name,
              shopAddress: text,
            };
          });
        }}
        multiline={true}
      />
      <ButtonPrimary value="Create Shop" btnAction={createShopErrorHandler} />

      <LoadingModal visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  createShopBox: {
    backgroundColor: "#fff",
    padding: 20,
  },
  createText: {
    fontSize: 18,
    alignSelf: "center",
  },
  createText2: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  textCreate: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  textVirt: {
    textAlign: "center",
    marginBottom: 10,
    color: "#5e5a5a",
  },
});

export default CreateShopNav;
