import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import baseColors from "../../common/baseColors";
import { useRoute } from "@react-navigation/native";
import UseSingProducts from "../../hooks/UseSingProducts";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { convertPrice } from "../../utilities/convertPrice";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cartSliceActions } from "../../Slice/Cart-Slice";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Alert } from "react-native";

export default function ProductView() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.isLoggedIn.userData);
  const [{ product, loading, error }, getSingleProducts] = UseSingProducts();
  const [imgUrl, setImgUrl] = useState(0);
  const route = useRoute();
  const id = route.params.id;

  const addToCartHandler = async () => {
    dispatch(cartSliceActions.setCartError(""));
    const products = {
      id: product._id,
      productName: product.name,
      productPrice: product.price,
      productCategory: product.category,
      productImage: product.images[0],
      productStock: product.stock,
      productQuant: 1,
    };

    if (products.productQuant <= products.productStock) {
      const cartData = await AsyncStorage.getItem("cartItems");
      const cartInfo = JSON.parse(cartData);

      if (cartInfo.length > 0) {
        const findItem = cartInfo.find((element) => element.id === products.id);
        if (findItem) {
          dispatch(
            cartSliceActions.setCartError("Product Already in Your Cart")
          );
          navigation.navigate("cart");
        } else {
          const newCart = [...cartInfo, products];
          await AsyncStorage.setItem("cartItems", JSON.stringify(newCart));
          navigation.navigate("cart");
        }
      } else {
        await AsyncStorage.setItem("cartItems", JSON.stringify([products]));
        navigation.navigate("cart");
      }
    } else {
      Alert.alert(
        "Out of stock",
        "OOps this Product is out of stock try another"
      );
    }
  };

  useEffect(() => {
    getSingleProducts(id);
  }, []);

  const setImageCount = (index) => {
    setImgUrl(index);
  };

  if (loading)
    return (
      <ActivityIndicator
        color={baseColors.primaryColor}
        size="large"
        style={styles.indicator}
      />
    );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.prodViewImageContainer}>
        <Image
          style={styles.prodViewImage}
          source={{
            uri: product.images[imgUrl],
          }}
          resizeMode="contain"
        />

        <View style={styles.selectImageContainer}>
          {product.images.map((img, index) => {
            return (
              <TouchableOpacity
                key={Math.random()}
                onPress={() => setImageCount(index)}
              >
                <View style={styles.selectImages}>
                  <Image
                    style={styles.prodViewsmallImage}
                    source={{
                      uri: img,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.prodDetails}>
        <View>
          <Text
            style={{
              backgroundColor: "#F7CDCF",
              padding: 6,
              alignSelf: "flex-start",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            {product.shop.name}
          </Text>
        </View>
        <Text style={styles.prodName}>{product.name}</Text>
        <View style={styles.shopAddress}>
          <MaterialCommunityIcons
            name="map-marker"
            size={20}
            color={baseColors.primaryColor}
          />
          <Text style={styles.addressText}>{product.shop.shopAddress}</Text>
        </View>

        <View style={styles.phone}>
          <MaterialCommunityIcons
            name="phone"
            size={20}
            color={baseColors.primaryColor}
          />
          <Text style={styles.phoneNo}>{product.owner.phoneNumber}</Text>
        </View>

        <View style={styles.phone}>
          <Text style={{ marginVertical: 10, color: "#333", fontSize: 15 }}>
            {product.stock === "0"
              ? "Out of Stock"
              : `In Stock: ${product.stock}`}
          </Text>
        </View>

        <Text style={{ marginTop: 5, color: "#333" }}>
          {product.description}
        </Text>

        <Text style={styles.price}>{convertPrice(product.price)}</Text>

        <ButtonPrimary value="Add to Cart" btnAction={addToCartHandler} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    borderTopColor: "#fff",
    borderBottomColor: "#eee",
    borderStyle: "solid",
    borderWidth: 2,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  prodViewImageContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  selectImageContainer: {
    flexDirection: "row",
  },
  selectImages: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderColor: baseColors.primaryColor,
    borderWidth: 1,
    borderStyle: "solid",
    padding: 5,
    borderRadius: 10,
  },
  prodViewsmallImage: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  prodViewImage: {
    width: 180,
    height: 180,
    alignSelf: "center",
  },
  prodDetails: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  prodName: {
    // fontWeight: 700,
    fontSize: 20,
  },
  shopAddress: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    // fontWeight: 700,
    marginVertical: 15,
  },
  phone: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneNo: {
    marginLeft: 5,
  },
  button: {
    backgroundColor: baseColors.primaryColor,
    padding: 15,
    alignItems: "center",
    color: "#fff",
    borderRadius: 10,
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addressText: {
    textTransform: "uppercase",
    paddingRight: 14,
  },
});
