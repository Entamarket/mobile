import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import baseColors from "../../common/baseColors";
import ProfileCard from "../../UIComponents/ProfileCard/ProfileCard";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import useGetUser from "../../hooks/useGet-User";
import Toast from "react-native-root-toast";
import * as Clipboard from "expo-clipboard";

const BuyerProfile = () => {
  const navigation = useNavigation();
  const [getUserData, { user, isUser }] = useGetUser();

  useEffect(() => {
    getUserData();
  }, []);

  const navigateToAccount = () => {
    navigation.navigate("Account");
  };

  const hanleCopyToClipBoard = async (value, type) => {
    await Clipboard.setStringAsync(value);
    Toast.show(`Copied ${type} to clipboard`, {
      duration: Toast.durations.SHORT,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.profileIconBox}>
          <FontAwesome name="user-o" style={styles.iconStyle} />
          <Text style={styles.profileHeaderText}>Profile Information</Text>
        </View>

        <ProfileCard
          type="First Name"
          hanleCopyToClipBoard={() =>
            hanleCopyToClipBoard(user.firstName, "First name")
          }
          value={isUser ? user.firstName : ""}
        />
        <ProfileCard
          type="Last Name"
          hanleCopyToClipBoard={() =>
            hanleCopyToClipBoard(user.lastName, "Last name")
          }
          value={isUser ? user.lastName : ""}
        />
        <ProfileCard
          type="Email Address"
          hanleCopyToClipBoard={() => hanleCopyToClipBoard(user.email, "Email")}
          value={isUser ? user.email : ""}
        />

        <ProfileCard
          type="Username"
          hanleCopyToClipBoard={() =>
            hanleCopyToClipBoard(user.username, "Username")
          }
          value={isUser ? user.username : ""}
        />
        <ProfileCard
          type="Phone Number"
          hanleCopyToClipBoard={() =>
            hanleCopyToClipBoard(user.phoneNumber, "PhoneNumber")
          }
          value={isUser ? user.phoneNumber : ""}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flex: 1,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 6 : 14,
  },
  profileMain: {
    padding: 9,
  },
  profileIconBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  iconStyle: {
    marginRight: 10,
    fontSize: 25,
  },
  profileHeaderText: {
    fontSize: 18,
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
});
export default BuyerProfile;
