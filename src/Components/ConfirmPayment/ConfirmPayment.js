import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useState } from "react";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";
import entamarketApi from "../../api/entamarketApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DialogueModal from "../../UIComponents/Dialogue-Modal/Dialogue-Modal";
import { useNavigation } from "@react-navigation/native";
import LoadingModal from "../../UIComponents/LoadingModal";

const ConfirmPayment = () => {
  const navigation = useNavigation();
  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
  });
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccesMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const requestPaymentHandler = async () => {
    if (amount === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Please Enter A Withdrawal Amount.",
      });
    } else {
      const token = await AsyncStorage.getItem("entamarketToken");
      const header = {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      };

      const amountValue = {
        amount: parseInt(amount),
      };
      setIsLoading(true);
      await entamarketApi
        .put("/trader/dashboard/confirm-bank-details", amountValue, header)
        .then((resp) => {
          setSuccesMsg(resp.data.msg);
          setShowModal(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setError({
            isVisible: true,
            display: "flex",
            errText: error.response.data.msg,
          });

          setIsLoading(false);
        });
    }
  };

  const handleHideDialogue = () => {
    setShowModal(false);
    navigation.navigate("Dashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Request Payment</Text>

      {error.isVisible ? (
        <Error display={error.display} text={error.errText} />
      ) : null}

      <TextInputBox
        labelName="Withdrawal Amount"
        changeText={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });
          setAmount(text);
        }}
        keyboardType="numeric"
      />

      <ButtonPrimary value="Send Request" btnAction={requestPaymentHandler} />

      <DialogueModal
        visible={showModal}
        dialogueTitle="Success"
        dialogueMessage={successMsg}
        handleHideDialogue={handleHideDialogue}
        actionBtnName="Ok"
        actionBtn={handleHideDialogue}
      />

      {isLoading ? <LoadingModal visible={isLoading} /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 6 : 14,
    paddingHorizontal: 20,
  },
  headerText: {
    // fontWeight: 800,
    fontSize: 20,
    marginVertical: 15,
    textAlign: "center",
  },
});
export default ConfirmPayment;
