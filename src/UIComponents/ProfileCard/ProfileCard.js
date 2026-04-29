import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import baseColors from "../../common/baseColors";

const ProfileCard = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.nameLabel}>{props.type}</Text>
        <Text>{props.value}</Text>
      </View>

      <TouchableOpacity onPress={props.hanleCopyToClipBoard}>
        <View>
          <Feather name="copy" size={17} color={baseColors.primaryDark} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    marginTop: 13,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nameLabel: {
    color: "grey",
    // fontWeight: 600,
  },
});

export default ProfileCard;
