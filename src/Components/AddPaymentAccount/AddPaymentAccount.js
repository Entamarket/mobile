import { StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";
import LoadingModal from "../../UIComponents/LoadingModal";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import entamarketApi from "../../api/entamarketApi";
import setToken from "../../utilities/tokenUpdater";

const AddPaymentAccount = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
  });

  const [bankInfo, setBankInfo] = useState({
    acctName: "",
    acctNumber: "",
    bankName: "",
  });

  const addPaymentAccountHandler = async () => {
    if (bankInfo.acctName === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Please Enter A Valid Account Name",
      });
    } else if (bankInfo.acctNumber === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Please Enter A Valid Account Number",
      });
    } else if (bankInfo.bankName === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Please Enter A Valid Bank Name",
      });
    } else {
      setError({
        isVisible: false,
        display: "none",
        errText: "",
      });

      setIsLoading(true);

      const bank = {
        bankDetails: {
          accountName: bankInfo.acctName,
          accountNumber: bankInfo.acctNumber,
          bankName: bankInfo.bankName,
        },
      };

      const token = await AsyncStorage.getItem("entamarketToken");
      const header = {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      };
      await entamarketApi
        .put("/trader/dashboard/update-profile", bank, header)
        .then((resp) => {
          navigation.navigate("SellerDetails");
          setToken(resp.data.entamarketToken);
          setIsLoading(false);
        })
        .catch((error) => {
          setToken(error.response.data.entamarketToken);
          setIsLoading(false);
          setError({
            isVisible: true,
            display: "flex",
            errText: error.response.data.errorObj.msg,
          });
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {error.isVisible ? (
        <Error display={error.display} text={error.errText} />
      ) : null}

      <TextInputBox
        labelName="Account Name"
        changeText={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });
          setBankInfo((prev) => {
            return {
              acctName: text,
              acctNumber: prev.acctNumber,
              bankName: prev.bankName,
            };
          });
        }}
      />
      <TextInputBox
        labelName="Account Number"
        keyboardType="numeric"
        changeText={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });
          setBankInfo((prev) => {
            return {
              acctName: prev.acctName,
              acctNumber: text,
              bankName: prev.bankName,
            };
          });
        }}
      />
      <TextInputBox
        labelName="Bank Name"
        changeText={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });

          setBankInfo((prev) => {
            return {
              acctName: prev.acctName,
              acctNumber: prev.acctNumber,
              bankName: text,
            };
          });
        }}
      />

      {isLoading ? <LoadingModal visible={isLoading} /> : null}
      <ButtonPrimary value="Add Account" btnAction={addPaymentAccountHandler} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
  },
  prodImg: {
    marginVertical: 10,
    alignItems: "center",
  },
  prodImgText: {
    // fontWeight: 600,
  },
  imageConBox: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: "dotted",
    marginRight: 13,
    padding: 3,
  },
  imageBox: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default AddPaymentAccount;
