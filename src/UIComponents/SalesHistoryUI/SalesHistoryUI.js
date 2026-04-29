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
import { TouchableOpacity } from "react-native-gesture-handler";

const SalesHistoryUI = () => {
  const [salesHistory, setSalesHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const getShopProducts = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("entamarketToken");
      const headers = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await entamarketApi
        .get(`/trader/get-sales-history?set=${counter}`, headers)
        .then((resp) => {
          setLoading(false);
          setSalesHistory(resp.data.salesHistoryData);
        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false);
        });
    };

    getShopProducts();
  }, [counter]);

  const increaseCount = () => {
    setCounter(counter + 1);
  };
  const decreaseCount = () => {
    setCounter(counter - 1);
  };

  if (loading) {
    return (
      <View style={styles.contain2}>
        <ActivityIndicator size="large" color={baseColors.primaryColor} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {salesHistory.length > 0 ? (
        salesHistory.map((product) => {
          return (
            <View style={styles.mainBox} key={product._id}>
              <View style={styles.mainCon}>
                <Text style={styles.shopSingleTextTop}>Product Name</Text>
                <Text style={styles.shopSingleBottom}>
                  {product.product.name}
                </Text>
              </View>

              <View style={styles.mainCon}>
                <Text style={styles.shopSingleTextTop}>Product Price</Text>
                <Text style={styles.shopSingleBottom}>
                  {convertPrice(product.product.price)}
                </Text>
              </View>

              <View style={styles.mainCon}>
                <Text style={styles.shopSingleTextTop}>Quantity</Text>
                <Text style={styles.shopSingleBottom}>{product.quantity}</Text>
              </View>

              <View style={styles.mainCon}>
                <Text style={styles.shopSingleTextTop}>Total Price</Text>
                <Text style={styles.shopSingleBottom}>
                  {convertPrice(
                    Number(product.product.price) * Number(product.quantity)
                  )}
                </Text>
              </View>
              <View style={styles.mainCon}>
                <Text style={styles.shopSingleTextTop}>Date /Time Sold</Text>
                <Text style={styles.shopSingleBottom}>{product.soldAt}</Text>
              </View>

              <ScrollView
                style={styles.mainCon}
                horizontal
                contentContainerStyle={{ flexWrap: "wrap" }}
              >
                {product.product.images.map((item) => {
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
        <OopsError type="No Sales History" />
      )}

      <View style={styles.btnContainers}>
        {salesHistory.length >= 20 ? (
          <TouchableOpacity
            style={[styles.btn, styles.btnColor1]}
            onPress={increaseCount}
          >
            <Text style={styles.textColor}>Load More</Text>
          </TouchableOpacity>
        ) : null}

        {counter > 0 ? (
          <TouchableOpacity
            style={[styles.btn, styles.btnColor2]}
            onPress={decreaseCount}
          >
            <Text style={styles.textCon}>Back</Text>
          </TouchableOpacity>
        ) : null}
      </View>
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
  btnContainers: {
    flexDirection: "row",
    alignContent: "center",
    marginVertical: 10,
    paddingBottom: 40,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  btnColor1: {
    backgroundColor: baseColors.primaryColor,
    marginRight: 20,
    color: "#fff",
  },
  btnColor2: {
    backgroundColor: "white",
    borderColor: baseColors.primaryColor,
    borderWidth: 1,
  },
  textColor: {
    color: "#fff",
    fontSize: 12,
    // fontWeight: 500,
  },
});
export default SalesHistoryUI;
