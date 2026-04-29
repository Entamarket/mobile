import { Dialog, Portal } from "react-native-paper";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import baseColors from "../../common/baseColors";

const DialogueModal = (props) => {
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.handleHideDialogue}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>{props.dialogueTitle}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{props.dialogueMessage}</Text>

          <View style={styles.logtype}>
            <TouchableOpacity onPress={props.handleHideDialogue}>
              <Text style={styles.logoutText1}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.actionBtn}>
              <Text style={styles.logoutText2}>{props.actionBtnName}</Text>
            </TouchableOpacity>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  logtype: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  logoutText1: {
    color: baseColors.primaryColor,
    // fontWeight: 700,
    fontSize: 15,
    marginRight: 20,
  },
  logoutText2: {
    // fontWeight: 700,
    fontSize: 15,
    marginRight: 20,
  },
});

export default DialogueModal;
