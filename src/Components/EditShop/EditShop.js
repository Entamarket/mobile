import { StyleSheet, Text } from "react-native";
import { Modal, Portal } from "react-native-paper";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../../UIComponents/Error/Error";

const EditShop = (props) => {
  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.closeCreateShopModal}
        contentContainerStyle={styles.createShopBox}
      >
        {props.error.isVisible ? <Error text={props.error.errText} /> : null}

        <Text style={styles.editText}>Edit Shop</Text>
        <TextInputBox
          value={props.value1}
          labelName="Shop Name"
          name="md-home-outline"
          changeText={props.changeText1}
        />
        <TextInputBox
          value={props.value2}
          labelName="Shop Address"
          name="ios-location-outline"
          changeText={props.changeText2}
          multiline={true}
        />
        <ButtonPrimary
          value="Save Changes"
          btnAction={props.handleEditShopsHandler}
        />
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  createShopBox: {
    backgroundColor: "#fff",
    padding: 20,
  },
  createText: {
    fontSize: 18,
    alignSelf: "center",
  },
  createText2: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  editText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
  },
});
export default EditShop;
