import { StyleSheet, Text } from "react-native";
import { Modal, Portal } from "react-native-paper";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Error from "../Error/Error";

const CreateShopModal = (props) => {
  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.closeCreateShopModal}
        contentContainerStyle={styles.createShopBox}
      >
        {props.error.isVisible ? <Error text={props.error.errText} /> : null}

        <Text style={styles.textCreate}>Create Shop</Text>
        <Text style={styles.textVirt}>
          Create a Virtual Shop to upload your products.
        </Text>

        <TextInputBox
          labelName="Shop Name"
          name="md-home-outline"
          changeText={props.changeText1}
        />
        <TextInputBox
          labelName="Shop Address"
          name="ios-location-outline"
          changeText={props.changeText2}
          multiline={true}
        />
        <ButtonPrimary value="Create Shop" btnAction={props.createAct} />
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
  textCreate: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  textVirt: {
    textAlign: "center",
    marginBottom: 10,
    color: "#5e5a5a",
  },
});
export default CreateShopModal;
