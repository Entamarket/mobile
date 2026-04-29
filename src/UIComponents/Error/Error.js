import { Text, View, StyleSheet } from "react-native";

const Error = (props) => {
  return (
    <View
      style={[
        props.type === "success" ? styles.success : styles.error,
        { display: props.display },
      ]}
    >
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  error: {
    marginVertical: 5,
    color: "#000",
    backgroundColor: "#fff",
    padding: 13,
    borderLeftWidth: 5,
    borderLeftColor: "red",
    borderRightColor: "#eee",
    borderRightWidth: 1,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    width: "100%",
    zIndex: 1000,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  success: {
    marginVertical: 10,
    color: "#000",
    position: "absolute",
    top: 25,
    backgroundColor: "#fff",
    padding: 15,
    borderLeftWidth: 5,
    borderLeftColor: "rgb(21, 187, 21)",
    borderRightColor: "#eee",
    borderRightWidth: 1,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    width: 320,
    zIndex: 1000,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
  },
});

export default Error;
