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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import baseColors from "../../common/baseColors";
import ProfileCard from "../../UIComponents/ProfileCard/ProfileCard";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import OopsError from "../../UIComponents/OopsError/OOpsError";
import { useRoute } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import * as Clipboard from "expo-clipboard";

const RequestPayment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const bankInfo = route.params.bankInfo;
  const [sellerInfo, setSellerInfo] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setSellerInfo(bankInfo);
      setLoading(false);
    }, [])
  );

  const cancelRequest = () => {
    navigation.navigate("Dashboard");
  };
  const navigateToAddPayment = () => {
    navigation.navigate("PaymentAccount");
  };

  const navigateToConfirmPayment = () => {
    navigation.navigate("ConfirmPayment");
  };

  const hanleCopyToClipBoard = async (value, type) => {
    await Clipboard.setStringAsync(value);
    Toast.show(`Copied ${type}`, {
      duration: Toast.durations.SHORT,
    });
  };

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
              <Text style={styles.profileHeaderText} numberOfLines={1}>
                Confirm Payment Account
              </Text>
            </View>
          </View>

          {sellerInfo ? (
            <View>
              <ProfileCard
                type="Account Name"
                hanleCopyToClipBoard={() =>
                  hanleCopyToClipBoard(sellerInfo.accountName, "Account Name")
                }
                value={sellerInfo.accountName}
              />
              <ProfileCard
                type="Account Number"
                hanleCopyToClipBoard={() =>
                  hanleCopyToClipBoard(
                    sellerInfo.accountNumber,
                    "Account Number"
                  )
                }
                value={sellerInfo.accountNumber}
              />
              <ProfileCard
                type="Bank Name"
                hanleCopyToClipBoard={() =>
                  hanleCopyToClipBoard(sellerInfo.bankName, "Bank Name")
                }
                value={sellerInfo.bankName}
              />

              <View style={styles.payBtnBox}>
                <TouchableOpacity
                  style={styles.btnBox1}
                  onPress={navigateToConfirmPayment}
                >
                  <Text style={styles.colorText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnBox2}
                  onPress={cancelRequest}
                >
                  <Text>Cancel</Text>
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
  btnBox1: {
    backgroundColor: baseColors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginRight: 20,
    color: "#fff",
  },
  btnBox2: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginRight: 20,
    color: "#fff",
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: baseColors.primaryColor,
    borderWidth: 1,
  },
  colorText: {
    color: "#fff",
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
  payBtnBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
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
export default RequestPayment;
