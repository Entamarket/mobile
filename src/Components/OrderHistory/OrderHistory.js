import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import entamarketApi from "../../api/entamarketApi";
import baseColors from "../../common/baseColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OopsError from "../../UIComponents/OopsError/OOpsError";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const getShopProducts = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("entamarketToken");
      const headers = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await entamarketApi
        .get(`/buyer/get-purchase-history?set=${counter}`, headers)
        .then((resp) => {
          setLoading(false);
          setOrderHistory(resp.data.purchaseHistoryData);
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

  const viewOrderHandler = (order) => {
    navigation.navigate("viewOrder", { order });
  };

  const saveFile = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  const getReceiptHandler = async (orderId) => {
    setLoading(true);
    const filename = "receipt.pdf";
    const token = await AsyncStorage.getItem("entamarketToken");
    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const result = await FileSystem.downloadAsync(
      `https://www.entamarket-api.com/buyer/get-receipt?id=${orderId}`,
      FileSystem.documentDirectory + filename,
      headers
    );
    saveFile(result.uri, filename, result.headers["Content-Type"]);
    setLoading(false);
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
      {orderHistory.length > 0 ? (
        orderHistory.map((order) => {
          return (
            <View key={order._id}>
              <View style={styles.mainBox}>
                <Text style={styles.text1}>Your Order on {order.date}</Text>

                <View style={styles.boxBtnFlex}>
                  <TouchableOpacity
                    style={[styles.btn, styles.btnColor1]}
                    onPress={() => viewOrderHandler(order)}
                  >
                    <Text style={styles.textColor}>View Order</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.btnColor2]}
                    onPress={() => getReceiptHandler(order._id)}
                  >
                    <Text style={styles.textCon}>Get Receipt</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <OopsError type="No Order History" />
      )}

      <View style={styles.btnContainers}>
        {orderHistory.length >= 20 ? (
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
    fontWeight: "500",
  },
  textCon: {
    fontSize: 12,
  },
  textBox: {
    marginVertical: 5,
  },
  boxBtnFlex: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  text1: {
    marginVertical: 5,
  },
});
export default OrderHistory;
