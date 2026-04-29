import { Modal, Portal } from "react-native-paper";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import baseColors from "../../common/baseColors";

const VerficationModal = (props) => {
  return (
    <Portal>
      <Modal
        visible={props.showVerifyBox}
        onDismiss={props.closeVerifyBox}
        contentContainerStyle={styles.ModalBoxStyle}
      >
        <View style={styles.iconBox}>
          <MaterialCommunityIcons
            name="exclamation-thick"
            size={30}
            style={styles.icon}
          />
        </View>
        <Text style={styles.compText}>Account Verification</Text>
        <Text>
          To start uploading products, making sales and using Entamarket as a
          Seller you are required to Validate your account with the Following
          Documents.
        </Text>

        <View style={styles.docType}>
          <Text>1. Government Issued ID Card</Text>
          <Text>2. Shop Utility Bill</Text>
        </View>

        <View style={styles.btnBox}>
          <TouchableOpacity style={styles.btn1} onPress={props.sellerNav}>
            <Text style={styles.btnText1}>Verify Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn2} onPress={props.closeVerifyBox}>
            <Text>Skip For Now</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  ModalBoxStyle: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
  },
  compText: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center",
  },
  iconBox: {
    alignItems: "center",
  },
  docType: {
    marginTop: 10,
  },
  icon: {
    backgroundColor: baseColors.tpRed,
    padding: 10,
    borderRadius: 5,
    borderRadius: 100,
    color: baseColors.tpLightRed,
  },
  btnBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  btn1: {
    backgroundColor: baseColors.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 100,
    marginRight: 10,
  },
  btnText1: {
    color: "#fff",
    fontSize: 13,
  },
  btn2: {
    borderColor: baseColors.primaryColor,
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    borderRadius: 100,
  },
});

export default VerficationModal;
