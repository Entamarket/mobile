import {
  SafeAreaView,
  Platform,
  StyleSheet,
  StatusBar,
  StatusBar as RNStatusBar,
} from "react-native";
import AuthenticateUser from "../Components/AuthenticateUser/AuthenticateUser";
import { useSelector } from "react-redux";
import BuyerAcount from "../Components/BuyerAccount/BuyerAccount";
import baseColors from "../common/baseColors";
import SellerAccount from "../Components/SellerAccount/SellerAccount";

export default function DashboardScreen() {
  const userData = useSelector((state) => state.isLoggedIn.userData);

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
        <AuthenticateUser type="Account" />
      </SafeAreaView>
    );
  }

  if (userData.accountType === "buyer") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
        <BuyerAcount />
      </SafeAreaView>
    );
  }

  if (userData.accountType === "trader") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
        <SellerAccount />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: baseColors.greyLight,
    flex: 1,
    paddingTop:
      Platform.OS === "android" ? (RNStatusBar.currentHeight ?? 0) + 6 : 14,
  },
});
