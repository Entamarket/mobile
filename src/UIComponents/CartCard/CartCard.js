import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { convertPrice } from "../../utilities/convertPrice";
import baseColors from "../../common/baseColors";
import Ionicons from "@expo/vector-icons/Ionicons";

const CartCard = (props) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardImg}>
        <Image
          source={{ uri: props.img }}
          style={{ width: 60, height: 60 }}
          resizeMode="contain"
        />
      </View>

      <View>
        <Text>{props.prodName}</Text>
        <Text>{convertPrice(props.prodPrice)}</Text>

        <View style={styles.quantContainer}>
          <TouchableOpacity onPress={props.IncreaseQunatity}>
            <Text style={styles.addProd}>+</Text>
          </TouchableOpacity>
          <Text>{props.productQuant}</Text>
          <TouchableOpacity onPress={props.decreaseQunatity}>
            <Text style={[styles.addProd, styles.addProd2]}>-</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={props.removeCartItem}>
          <Ionicons name="ios-trash" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(223, 223, 223)",
  },
  cardImg: {
    marginRight: 20,
    borderRadius: 40,
  },
  quantContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  addProd: {
    backgroundColor: baseColors.lightPrimaryColor,
    color: baseColors.primaryColor,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 20,
  },
  addProd2: {
    marginLeft: 10,
    fontSize: 20,
    // fontWeight: 600,
  },
  iconStyle: {
    fontSize: 20,
    marginLeft: 20,
    color: "rgb(189, 26, 26)",
  },
});

export default CartCard;
