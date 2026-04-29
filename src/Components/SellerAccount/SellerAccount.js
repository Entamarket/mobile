import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AccountCard from "../../UIComponents/Account-Card/Account-Card";
import baseColors from "../../common/baseColors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { SliceActions } from "../../Slice/Auth-Slice";
import { useNavigation } from "@react-navigation/native";
import DialogueModal from "../../UIComponents/Dialogue-Modal/Dialogue-Modal";
import entamarketApi from "../../api/entamarketApi";
import LoadingModal from "../../UIComponents/LoadingModal";

export default function BuyerAcount() {
  const [visible, setVisible] = useState(false);
  const [actionTye, setActionType] = useState("Logout");
  const [isLoading, setIsLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState(
    "Are you sure you want to Logout from your account?"
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleHideDialogue = () => {
    setVisible(false);
  };

  const logoOutUser = () => {
    setVisible(true);
    setActionType("Logout");
    setActionMsg("Are you sure you want to Logout from your account?");
  };

  const logoutHandler = async () => {
    try {
      await AsyncStorage.removeItem("entamarketToken");
      dispatch(SliceActions.setUserData(false));
      setVisible(false);
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleteModal = () => {
    setActionType("Delete");
    setVisible(true);
    setActionMsg("Are you sure you want to Delete your account?");
  };

  const deleteAccountHandler = async () => {
    setIsLoading(true);
    setVisible(false);
    const token = await AsyncStorage.getItem("entamarketToken");
    const header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      await entamarketApi.delete("/trader/dashboard/delete-account", header);
      await AsyncStorage.removeItem("entamarketToken");
      dispatch(SliceActions.setUserData(false));
      navigation.navigate("HomeScreen");
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const viewProfileInfo = () => {
    navigation.navigate("BuyerProfile");
  };

  const sellerUpdateEmail = () => {
    navigation.navigate("sellerUpdateEmail");
  };
  const sellerResetPassword = () => {
    navigation.navigate("resetSellerPass");
  };

  const navigateToUpdateProfile = () => {
    navigation.navigate("updateSellerProfile");
  };

  const navigateToCustomerSupport = () => {
    navigation.navigate("CustomerSupport");
  };

  return (
    <View style={styles.buyerAccount}>
      <View style={styles.buyerHeader}>
        <FontAwesome name="user-o" style={styles.iconStyle} />
        <Text style={styles.HeaderText}>Seller Account</Text>
      </View>

      <View style={styles.mainBox}>
        <AccountCard
          cardName="Profile Information"
          cardAction={viewProfileInfo}
        />
        <AccountCard
          cardName="Update Seller Profile"
          cardAction={navigateToUpdateProfile}
        />
        <AccountCard cardName="Update Email" cardAction={sellerUpdateEmail} />

        <AccountCard
          cardName="Reset Password"
          cardAction={sellerResetPassword}
        />

        <AccountCard
          cardName="Customer Support"
          cardAction={navigateToCustomerSupport}
        />
        <TouchableOpacity onPress={logoOutUser}>
          <View style={[styles.logoutBtn, styles.deleteBtn]}>
            <Entypo name="log-out" style={styles.logoutIcon} />
            <Text style={styles.logoutColor}>Logout</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={showDeleteModal}>
          <View style={[styles.deleteBtn, styles.deleteBtnType]}>
            <AntDesign name="delete" style={styles.deleteIcon} />
            <Text style={styles.deleteBtnColor}>Delete Account</Text>
          </View>
        </TouchableOpacity>
      </View>

      <DialogueModal
        visible={visible}
        handleHideDialogue={handleHideDialogue}
        actionBtn={
          actionTye === "Logout" ? logoutHandler : deleteAccountHandler
        }
        dialogueMessage={actionMsg}
        actionBtnName={actionTye}
        dialogueTitle={actionTye}
      />

      {isLoading ? <LoadingModal visible={isLoading} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 35,
  },
  HeaderText: {
    // fontWeight: 600,
    fontSize: 15,
    marginVertical: 5,
  },
  buyerHeader: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  mainBox: {
    margin: 15,
  },
  logoutColor: {
    color: "black",
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
