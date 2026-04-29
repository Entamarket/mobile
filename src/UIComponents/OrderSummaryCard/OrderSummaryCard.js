import { View, Text, StyleSheet, Image } from "react-native";
import { convertPrice } from "../../utilities/convertPrice";
import baseColors from "../../common/baseColors";

const OrderSummaryCard = (props) => {
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
          <Text>Quantity: {props.productQuant}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
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

export default OrderSummaryCard;
