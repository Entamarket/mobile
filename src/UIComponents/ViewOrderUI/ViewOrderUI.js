import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { convertPrice } from "../../utilities/convertPrice";
import baseColors from "../../common/baseColors";
import OopsError from "../OopsError/OOpsError";
import { useRoute } from "@react-navigation/native";

const ViewOrderUI = () => {
  const route = useRoute();
  const { order } = route.params;

  return (
    <ScrollView style={styles.container}>
      {order.products.length > 0 ? (
        order.products.map((product) => {
          return (
            <>
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
                  <Text style={styles.shopSingleBottom}>
                    {product.quantity}
                  </Text>
                </View>

                <View style={styles.mainCon}>
                  <Text style={styles.shopSingleTextTop}>Date /Time Sold</Text>
                  <Text style={styles.shopSingleBottom}>{order.date}</Text>
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
            </>
          );
        })
      ) : (
        <OopsError type="No Sales History" />
      )}

      <View style={styles.mainBox}>
        <Text style={styles.mainConText1}>Transaction Summary</Text>

        <View style={styles.mainCon}>
          <Text style={styles.shopSingleTextTop}>Date/Time</Text>
          <Text style={styles.shopSingleBottom}>{order.date}</Text>
        </View>

        <View style={styles.mainCon}>
          <Text style={styles.shopSingleTextTop}>Logistics Fee</Text>
          <Text style={styles.shopSingleBottom}>
            {convertPrice(order.logisticsFee)}
          </Text>
        </View>

        <View style={styles.mainCon}>
          <Text style={styles.shopSingleTextTop}>Transaction Fee</Text>
          <Text style={styles.shopSingleBottom}>
            {convertPrice(order.paymentGatewayFee)}
          </Text>
        </View>
        <View style={styles.mainCon}>
          <Text style={styles.shopSingleTextTop}>Total Price</Text>
          <Text style={styles.shopSingleBottom}>
            {convertPrice(order.total)}
          </Text>
        </View>
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

    marginBottom: 3,
  },
  shopSingleBottom: {
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
  },
  mainConText1: {
    marginVertical: 10,
    fontSize: 20,
    textAlign: "center",
  },
});
export default ViewOrderUI;
