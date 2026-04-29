import { View, Text, TextInput, StyleSheet } from "react-native";
import baseColors from "../../common/baseColors";
import Ionicons from "@expo/vector-icons/Ionicons";

const TextInputBox = (props) => {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.label}>{props.labelName}</Text>
      <View style={styles.textInp}>
        <Ionicons name={props.name} size={17} />
        <TextInput
          autoComplete="off"
          value={props.value}
          style={styles.input}
          placeholder={props.labelName}
          onChangeText={props.changeText}
          keyboardType={props.keyboardType}
          multiline={props.multiline}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    // fontWeight: 800,
    color: "rgb(80, 79, 79)",
    marginVertical: 5,
  },
  inputBox: {
    paddingHorizontal: 3,
  },
  input: {
    width: "100%",
    padding: 13,
    fontSize: 15,
  },
  textInp: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderRadius: 5,
    backgroundColor: baseColors.lightWhite,
    fontSize: 15,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});

export default TextInputBox;
