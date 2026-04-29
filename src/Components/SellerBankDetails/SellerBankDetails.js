import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import baseColors from "../../common/baseColors";
import ProfileCard from "../../UIComponents/ProfileCard/ProfileCard";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import entamarketApi from "../../api/entamarketApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OopsError from "../../UIComponents/OopsError/OOpsError";
import Toast from "react-native-root-toast";
import * as Clipboard from "expo-clipboard";

const SellerBankDetails = () => {
  const navigation = useNavigation();
  const [sellerInfo, setSellerInfo] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const getSeller = async () => {
        const token = await AsyncStorage.getItem("entamarketToken");
        const header = {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        };
        await entamarketApi
          .get("/trader/dashboard", header)
          .then((res) => {
            setSellerInfo(res.data.traderData);
            setLoading(false);
          })
          .catch((error) => console.log(error.response.data));
      };

      getSeller();
    }, [])
  );

  const navigateToAccount = () => {
    navigation.navigate("Dashboard");
  };
  const navigateToAddPayment = () => {
    navigation.navigate("PaymentAccount");
  };

  const hanleCopyToClipBoard = async (value, type) => {
    await Clipboard.setStringAsync(value);
    Toast.show(`Copied ${type}`, {
      duration: Toast.durations.SHORT,
    });
  };

  const navigateToPayAccount = () => navigation.navigate("PaymentAccount");

  if (loading) {
    return (
      <View style={styles.contain2}>
        <ActivityIndicator size="large" color={baseColors.primaryColor} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.profileIconBox}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name="bank-outline"
                style={styles.iconStyle}
              />
              <Text style={styles.profileHeaderText}>Payment Account</Text>
            </View>

            <TouchableOpacity
              style={styles.editIcon}
              onPress={navigateToPayAccount}
            >
              <Feather name="edit" size={20} />
            </TouchableOpacity>
          </View>

          {sellerInfo.hasOwnProperty("bankDetails") ? (
            <View>
              <ProfileCard
                type="Account Name"
                hanleCopyToClipBoard={() =>
                  hanleCopyToClipBoard(
                    sellerInfo.bankDetails.accountName,
                    "Account Name"
                  )
                }
                value={sellerInfo.bankDetails.accountName}
              />
              <ProfileCard
                type="Account Number"
                hanleCopyToClipBoard={() =>
                  hanleCopyToClipBoard(
                    sellerInfo.bankDetails.accountNumber,
                    "Account Number"
                  )
                }
                value={sellerInfo.bankDetails.accountNumber}
              />
              <ProfileCard
                type="Bank Name"
                hanleCopyToClipBoard={() =>
                  hanleCopyToClipBoard(
                    sellerInfo.bankDetails.bankName,
                    "Bank Name"
                  )
                }
                value={sellerInfo.bankDetails.bankName}
              />

              <View style={styles.profileMain}>
                <TouchableOpacity onPress={navigateToAccount}>
                  <View style={[styles.deleteBtn, styles.deleteBtnType]}>
                    <AntDesign name="left" style={styles.deleteIcon} />
                    <Text style={styles.deleteBtnColor}>Back</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <OopsError type="No Payment Account Found. ">
              <TouchableOpacity
                style={styles.btnAddProd}
                onPress={navigateToAddPayment}
              >
                <Text style={styles.btnText}>Add Payment Account</Text>
              </TouchableOpacity>
            </OopsError>
          )}
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flex: 1,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 6 : 14,
  },
  contain2: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  profileMain: {
    padding: 9,
  },
  profileIconBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
  },
  iconBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginRight: 10,
    fontSize: 25,
  },
  profileHeaderText: {
    fontSize: 18,
    // fontWeight: 600,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    padding: 18,
    borderRadius: 10,
    textAlign: "center",
  },
  deleteBtnType: {
    backgroundColor: baseColors.primaryColor,
  },
  logoutBtn: {
    backgroundColor: "#fff",
  },
  deleteBtnColor: {
    color: "#fff",
    fontSize: 15,
  },
  deleteIcon: {
    color: "#fff",
    fontSize: 15,
    marginRight: 5,
  },
  logoutIcon: {
    color: "black",
    fontSize: 15,
    marginRight: 5,
  },
  btnAddProd: {
    backgroundColor: baseColors.primaryColor,
    paddingVertical: 13,
    paddingHorizontal: 26,
    borderRadius: 100,
  },
  btnText: {
    color: "#fff",
  },
  editIcon: {
    backgroundColor: "#dfe3ff",
    color: baseColors.primaryColor,
    padding: 5,
    borderRadius: 100,
  },
});
export default SellerBankDetails;
