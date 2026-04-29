import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const PendingButton = (props) => {
  return (
    <TouchableOpacity style={styles.orderBox} onPress={props.viewPendingOrder}>
      <View style={styles.orderStatus}></View>
      <Text style={styles.pendText}>{props.typeName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderStatus: {
    width: 15,
    height: 15,
    backgroundColor: "rgba(219, 132, 101, 0.644)",
    borderRadius: 100,
    marginRight: 5,
  },
  orderBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#eee",
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  pendText: {
    // fontWeight: 600,
    color: "grey",
  },
});

export default PendingButton;
