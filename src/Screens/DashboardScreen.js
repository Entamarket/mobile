import {
  Platform,
  StyleSheet,
  StatusBar,
  StatusBar as RNStatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthenticateUser from "../Components/AuthenticateUser/AuthenticateUser";
import { useSelector } from "react-redux";
import BuyerDashboard from "../Components/BuyerDashboard/BuyerDashboard";
import SellerDashboard from "../Components/SellerDashboard/SellerDashboard";
import baseColors from "../common/baseColors";

export default function DashboardScreen() {
  const userData = useSelector((state) => state.isLoggedIn.userData);

  if (!userData) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
        <AuthenticateUser type="Dashboard" />
      </SafeAreaView>
    );
  }

  if (userData.accountType === "buyer") {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
        <BuyerDashboard />
      </SafeAreaView>
    );
  }

  if (userData.accountType === "trader") {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
        <SellerDashboard />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: baseColors.greyLight,
    flex: 1,
  },
});
