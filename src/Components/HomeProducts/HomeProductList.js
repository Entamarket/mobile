import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { convertPrice } from "../../utilities/convertPrice";
import baseColors from "../../common/baseColors";

export default function HomeProductList({ name, images, price, id, stock }) {
  const navigation = useNavigation();
  let widthType = "";
  let widthStyles = {
    error: styles.widthBoxError,
    widthMiddle: styles.widthMiddle,
    widthUp: styles.widthUp,
    widthUp2: styles.widthUp2,
  };

  if (stock <= 5) {
    widthType = widthStyles.error;
  } else if (stock >= 5 && stock <= 29) {
    widthType = widthStyles.error;
  } else if (stock >= 30 && stock <= 49) {
    widthType = widthStyles.widthUp;
  } else {
    widthType = widthStyles.widthMiddle;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ProductView", { id })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: images ? images[0] : null }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.prodInfoBox}>
        <View style={styles.prodInfo}>
          <Text numberOfLines={1}>{name ? name : null}</Text>
          <Text style={styles.price}>{price ? convertPrice(price) : null}</Text>
        </View>

        <View>
          <View style={styles.mainBox}>
            <Text style={{ fontSize: 12 }}>{stock} Items Left</Text>
            <View style={styles.widthBox1}>
              <View
                style={[
                  {
                    width: parseInt(stock) >= 100 ? "100%" : parseInt(stock),
                  },
                  widthType,
                ]}
              ></View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    borderColor: "#eee",
    borderWidth: 1,
    borderStyle: "solid",
    margin: "1%",
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 10,
    paddingTop: 15,
  },
  image: {
    alignSelf: "center",
    width: 60,
    height: 60,
  },
  prodInfoBox: {
    padding: 5,
  },
  prodInfo: {
    marginVertical: 8,
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
  },
  addToCartBtn: {
    backgroundColor: baseColors.primaryColor,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  btnCartStyle: {
    color: "#fff",
    fontSize: 12,
  },
  widthBox1: {
    width: 100,
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 100,
  },
  widthUp: {
    height: 6,
    backgroundColor: baseColors.yellowStock,
    borderRadius: 100,
  },
  widthUp2: {
    height: 6,
    backgroundColor: baseColors.secondaryColor,
    borderRadius: 100,
  },
  widthBoxError: {
    height: 6,
    backgroundColor: baseColors.errorColor,
    borderRadius: 100,
  },
  widthMiddle: {
    height: 6,
    backgroundColor: baseColors.greenStock,
    borderRadius: 100,
  },
  widthBox2: {
    height: 6,
    backgroundColor: baseColors.secondaryColor,
    borderRadius: 100,
  },
  mainBox: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
