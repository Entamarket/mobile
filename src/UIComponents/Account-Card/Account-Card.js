import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const AccountCard = (props) => {
  return (
    <TouchableOpacity onPress={props.cardAction}>
      <View style={styles.mainBox2}>
        <Text style={styles.acctBoxName}>{props.cardName}</Text>
        <MaterialIcons name="keyboard-arrow-right" style={styles.acctIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBox2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginVertical: 7,
    padding: 18,
    borderRadius: 10,
  },
  acctBoxName: {
    fontSize: 15,
  },
  acctIcon: {
    fontSize: 23,
    color: "grey",
  },
});

export default AccountCard;
