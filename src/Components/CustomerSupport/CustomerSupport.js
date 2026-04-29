import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import LoadingModal from "../../UIComponents/LoadingModal";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import entamarketApi from "../../api/entamarketApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const CustomerSupport = () => {
  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [supportData, setSupportData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleContactSupport = async () => {
    if (supportData.fullName === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Full name is Required",
      });
    } else if (supportData.email === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Email is Required",
      });
    } else if (supportData.message === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Message is Required",
      });
    } else {
      setError({
        isVisible: false,
        display: "none",
        errText: "",
      });

      setIsLoading(true);
      const token = await AsyncStorage.getItem("entamarketToken");
      const headers = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await entamarketApi
        .post("/customer-support/send", supportData, headers)
        .then((resp) => {
          setIsLoading(false);
          setError({
            isVisible: true,
            display: "flex",
            errText: "Message Sent, You will get a Response Soon from Our Team",
            type: "success",
          });
        })
        .catch((error) => {
          setError({
            isVisible: true,
            display: "flex",
            errText: error.response.data.msg,
            type: "error",
          });
          setIsLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.signTextCon}>
          <Text style={styles.signInText}>Customer Support</Text>
          <Text style={styles.signupText}>
            Typically Reply through email, within 2-3 hours of contact.
          </Text>
        </View>

        {error.isVisible ? (
          <Error
            display={error.display}
            text={error.errText}
            type={error.type}
          />
        ) : null}

        <TextInputBox
          labelName="Full Name"
          name="person-outline"
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setSupportData((prev) => {
              return {
                fullName: text,
                email: prev.email,
                message: prev.message,
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
            setSupportData((prev) => {
              return {
                fullName: prev.fullName,
                email: text,
                message: prev.message,
              };
            });
          }}
        />

        <TextInputBox
          labelName="Message"
          multiline={true}
          changeText={(text) => {
            setError({
              isVisible: false,
              display: "none",
              errText: "",
            });
            setSupportData((prev) => {
              return {
                fullName: prev.fullName,
                email: prev.email,
                message: text,
              };
            });
          }}
        />

        <ButtonPrimary value="Send" btnAction={handleContactSupport} />
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

export default CustomerSupport;
