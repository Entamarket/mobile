import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import baseColors from "../../common/baseColors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";

const PasswordInput = (props) => {
  const [showPass, setShowPass] = useState(true);
  const showPassHandler = () => {
    setShowPass(!showPass);
  };
  return (
    <View style={styles.inputBox}>
      <Text style={styles.label}>{props.labelName}</Text>
      <View style={styles.textInp}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={20}
          style={styles.passIcon}
        />
        <TextInput
          secureTextEntry={showPass}
          autoComplete="off"
          style={styles.input}
          placeholder={props.labelName}
          onChangeText={props.changeText}
        />

        <TouchableOpacity onPress={showPassHandler}>
          {showPass ? (
            <MaterialCommunityIcons name="eye-outline" size={20} />
          ) : (
            <MaterialCommunityIcons name="eye-off-outline" size={20} />
          )}
        </TouchableOpacity>
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
  input: {
    padding: 13,
    width: "85%",
    fontSize: 15,
  },
  inputBox: {
    paddingHorizontal: 0,
  },
  textInp: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderRadius: 5,
    backgroundColor: baseColors.lightWhite,
    fontSize: 15,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default PasswordInput;
