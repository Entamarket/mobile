import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const ButtonSecondary = (props) => {
  return (
    <TouchableOpacity onPress={props.btnAction}>
      <View style={[styles.btn1, styles.btn2]}>
        <Text style={styles.btnColor}>{props.value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    padding: 18,
    borderRadius: 10,
    textAlign: "center",
  },
  btn2: {
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 1,
  },
  btnColor: {
    color: "#000",
    fontSize: 15,
  },
});

export default ButtonSecondary;
