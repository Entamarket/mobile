import {
  Platform,
  StyleSheet,
  StatusBar,
  StatusBar as RNStatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthenticateUser from "../Components/AuthenticateUser/AuthenticateUser";
import { useSelector } from "react-redux";
import NotificationScreen from "../Components/BuyerNotification/BuyerNotification";
import SellerNotification from "../Components/SellerNotification/SellerNotification";
import baseColors from "../common/baseColors";

export default function DashboardScreen() {
  const userData = useSelector((state) => state.isLoggedIn.userData);

  if (!userData) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
        <AuthenticateUser type="Notifications" />
      </SafeAreaView>
    );
  }

  if (userData.accountType === "buyer") {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <NotificationScreen />
        <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
      </SafeAreaView>
    );
  }

  if (userData.accountType === "trader") {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <SellerNotification />
        <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
