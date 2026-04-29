import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonPrimary from "../UIComponents/Button-Primary/Button-Primary";
import ButtonSecondary from "../UIComponents/Button-Secondary/ButtonSecondary";
import { useNavigation } from "@react-navigation/native";
import baseColors from "../common/baseColors";
import TextSign from "../UIComponents/TextSign/TextSign";

export default function CreateAccountScreen() {
  const navigation = useNavigation();

  const moveToSignIn = () => {
    navigation.navigate("Dashboard");
  };

  const navigateToBuyerCreateAccount = () => {
    navigation.navigate("BuyerSignUp");
  };

  const navigateToSellerCreateAccount = () => {
    navigation.navigate("SellerSignUp");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.TextBox}>
          <Text style={styles.headingText}>Create Your Account</Text>
          <Text style={styles.heading2}>
            Please select your account type to create an account as a Buyer or
            Seller.
          </Text>
        </View>

        <View style={styles.btnBox}>
          <ButtonPrimary
            value="Buyer Account"
            btnAction={navigateToBuyerCreateAccount}
          />

          <ButtonSecondary
            value="Seller Account"
            btnAction={navigateToSellerCreateAccount}
          />
        </View>

        <TextSign
          signText1="Already have an Account"
          signText2="Sign in"
          textAction={moveToSignIn}
        />
      </ScrollView>

      <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  TextBox: {
    alignItems: "center",
    paddingHorizontal: 8,
  },
  headingText: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },
  btnBox: {
    marginTop: 16,
    gap: 12,
  },
  heading2: {
    paddingTop: 8,
    textAlign: "center",
    color: "#374151",
  },
});
