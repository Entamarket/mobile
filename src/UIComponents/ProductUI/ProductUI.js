import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { convertPrice } from "../../utilities/convertPrice";
import { useEffect, useState } from "react";
import entamarketApi from "../../api/entamarketApi";
import baseColors from "../../common/baseColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OopsError from "../OopsError/OOpsError";

const ProductUI = () => {
  const [shopProduct, setShopProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShopProducts = async () => {
      const token = await AsyncStorage.getItem("entamarketToken");
      const headers = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await entamarketApi
        .get(`/product/get-all-traders-products`, headers)
        .then((resp) => {
          setLoading(false);
          setShopProduct(resp.data.products);
        })
        .catch((error) => {
          console.log(error.response.data);
          setLoading(false);
        });
    };

    getShopProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.contain2}>
        <ActivityIndicator size="large" color={baseColors.primaryColor} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {shopProduct.length > 0 ? (
        shopProduct.map((product) => {
          return (
            <View style={styles.mainBox} key={product._id}>
              <View style={styles.mainCon}>
                <Text style={styles.shopSingleTextTop}>Product Name</Text>
                <Text style={styles.shopSingleBottom}>{product.name}</Text>
              </View>

              <View style={styles.mainCon}>
                <Text style={styles.shopSingleTextTop}>Product Price</Text>
                <Text style={styles.shopSingleBottom}>
                  {convertPrice(product.price)}
                </Text>
              </View>

              <View style={styles.mainCon}>
                <Text style={styles.shopSingleTextTop}>Product Category</Text>
                <Text style={styles.shopSingleBottom}>{product.category}</Text>
              </View>

              <View style={styles.mainCon}>
                <Text style={styles.shopSingleTextTop}>
                  Product Stock (In Stock)
                </Text>
                <Text style={styles.shopSingleBottom}>{product.stock}</Text>
              </View>
              <View style={styles.mainCon}>
                <Text style={styles.shopSingleTextTop}>
                  Product Description
                </Text>
                <Text style={styles.shopSingleBottom}>
                  {product.description}
                </Text>
              </View>

              <ScrollView
                style={styles.mainCon}
                horizontal
                contentContainerStyle={{ flexWrap: "wrap" }}
              >
                {product.images.map((item) => {
                  return (
                    <View key={item}>
                      <Image
                        source={{ uri: item }}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: "contain",
                          marginHorizontal: 10,
                        }}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          );
        })
      ) : (
        <OopsError type="No Product Available" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  contain2: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  prodEditContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  mainBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  mainCon: {
    borderBottomColor: "#ccc",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  shopSingleTextTop: {
    color: "grey",
    // fontWeight: 500,
    marginBottom: 3,
  },
  shopSingleBottom: {
    // fontWeight: 600,
    color: "#000",
  },
});
export default ProductUI;
