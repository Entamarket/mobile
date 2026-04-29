import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

const ShopUI = (props) => {
  return (
    <TouchableOpacity onPress={props.shopHandler}>
      <View style={styles.shopDataBox}>
        <View>
          <Text style={styles.shopName} numberOfLines={1}>
            {props.shopname}
          </Text>
        </View>

        <View style={styles.shopDataIcon}>
          <TouchableOpacity onPress={props.deleteHandler}>
            <Ionicons
              name="trash-outline"
              size={16}
              style={[styles.iconData, styles.icon1]}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.editHandler}>
            <Feather
              name="edit"
              size={16}
              style={[styles.iconData, styles.icon2]}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.shopHandler}>
            <Feather
              name="eye"
              size={18}
              style={[styles.iconData, styles.icon2]}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.shareShopHandler}>
            <Ionicons
              name="share-outline"
              size={18}
              style={[styles.iconData, styles.icon2]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon1: {
    backgroundColor: "rgb(255, 182, 182)",
    color: "rgb(245, 54, 54)",
  },
  icon2: {
    backgroundColor: "#dfe3ff",
  },
  shopDataBox: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 13,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#eee",
  },
  iconData: {
    marginRight: 15,
    padding: 5,
    borderRadius: 100,
  },
  shopDataIcon: {
    flexDirection: "row",
  },
  shopName: {
    fontSize: 16,
    marginBottom: 10,
  },
});
export default ShopUI;
