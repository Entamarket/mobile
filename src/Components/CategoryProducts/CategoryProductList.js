import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { convertPrice } from "../../utilities/convertPrice";

export default function CategoryProductList({ name, images, price, id }) {
  const navigation = useNavigation();

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
          <Text numberOfLines={1}>{name}</Text>
          <Text style={styles.price}>{convertPrice(price)}</Text>
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
    width: 75,
    height: 75,
  },
  prodInfoBox: {
    padding: 5,
  },
  prodInfo: {
    marginVertical: 8,
  },
  price: {
    // fontWeight: "bold",
  },
});
