import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import baseColors from "../../common/baseColors";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import ButtonSecondary from "../../UIComponents/Button-Secondary/ButtonSecondary";

export default function AuthenticateUser(props) {
  const navigation = useNavigation();

  const moveToCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };
  const navigateToBuyerSignIn = () => {
    navigation.navigate("BuyerSignIn");
  };
  const navigateToSellerSignIn = () => {
    navigation.navigate("SellerSignIn");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView>
        <View style={styles.TextBox}>
          <Text style={styles.headingText}>Sign in to Continue</Text>
          <Text style={styles.heading2}>
            Please you are required to sign in to View your {props.type}, Choose
            your Account Type to sign In.
          </Text>
        </View>

        <View style={styles.btnBox}>
          <ButtonPrimary
            value="Buyer Sign in"
            btnAction={navigateToBuyerSignIn}
          />

          <ButtonSecondary
            value="Seller Sign In"
            btnAction={navigateToSellerSignIn}
          />
        </View>

        <TouchableOpacity onPress={moveToCreateAccount}>
          <View style={styles.CreateText}>
            <Text style={styles.heading3}>
              Don't Have an Account?{" "}
              <Text style={styles.createAcct}>Create Account</Text>
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  TextBox: {
    alignItems: "center",
    paddingLeft: 3,
    paddingRight: 3,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "700",
  },
  buttonStyle: {
    marginVertical: 13,
    justifyContent: "center",
    height: 55,
  },
  btnBox: {
    padding: 20,
  },
  CreateText: {
    alignItems: "center",
  },
  heading3: {
    fontSize: 15,
    fontWeight: "500",
  },
  createAcct: {
    color: baseColors.hoverColor,
  },
  heading2: {
    paddingLeft: 8,
    paddingRight: 8,
  },
});
