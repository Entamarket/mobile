import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import baseColors from "../../common/baseColors";

const NoPendingOrder = (props) => {
  return (
    <View>
      <AntDesign
        name="gift"
        color="rgba(240, 233, 233, 0.61)"
        style={styles.noPending}
      />
      <Text style={styles.noPendText}>
        You Currently Don't have Pending Orders, Shop to see your Pending order
        History.
      </Text>
      {props.countData > 0 ? (
        <View style={styles.btnContainers}>
          <TouchableOpacity
            style={[styles.btn, styles.btnColor2]}
            onPress={props.actionBtn}
          >
            <Text style={styles.textCon}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  noPending: {
    fontSize: 150,
    alignSelf: "center",
  },
  noPendText: {
    color: "grey",
  },
  textCon: {
    fontSize: 13,
    // fontWeight: 600,
  },

  btnContainers: {
    flexDirection: "row",
    alignContent: "center",
    margin: 10,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },

  btnColor2: {
    backgroundColor: "white",
    borderColor: baseColors.primaryColor,
    borderWidth: 1,
  },
});

export default NoPendingOrder;
