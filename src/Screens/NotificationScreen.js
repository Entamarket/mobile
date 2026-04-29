import {
  SafeAreaView,
  Platform,
  StyleSheet,
  StatusBar,
  StatusBar as RNStatusBar,
} from "react-native";
import AuthenticateUser from "../Components/AuthenticateUser/AuthenticateUser";
import { useSelector } from "react-redux";
import NotificationScreen from "../Components/BuyerNotification/BuyerNotification";
import SellerNotification from "../Components/SellerNotification/SellerNotification";
import baseColors from "../common/baseColors";

export default function DashboardScreen() {
  const userData = useSelector((state) => state.isLoggedIn.userData);

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
        <AuthenticateUser type="Notifications" />
      </SafeAreaView>
    );
  }

  if (userData.accountType === "buyer") {
    return (
      <SafeAreaView style={styles.container}>
        <NotificationScreen />
        <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
      </SafeAreaView>
    );
  }

  if (userData.accountType === "trader") {
    return (
      <SafeAreaView style={styles.container}>
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
    paddingTop:
      Platform.OS === "android" ? (RNStatusBar.currentHeight ?? 0) + 6 : 14,
  },
});
