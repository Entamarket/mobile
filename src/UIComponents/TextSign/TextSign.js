import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import baseColors from "../../common/baseColors";

const TextSign = (props) => {
  return (
    <TouchableOpacity onPress={props.textAction}>
      <View style={styles.acctText}>
        <Text style={styles.textSignIn}>
          {props.signText1}?
          <Text style={styles.textSignIn2}> {props.signText2}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  acctText: {
    alignItems: "center",
    justifyContent: "center",
  },
  textSignIn: {
    fontSize: 15,
    marginTop: 10,
  },
  textSignIn2: {
    color: baseColors.hoverColor,
  },
});

export default TextSign;
