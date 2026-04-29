import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import entamarketApi from "../../api/entamarketApi";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import OopsError from "../../UIComponents/OopsError/OOpsError";
import { TouchableOpacity } from "react-native-gesture-handler";
import setToken from "../../utilities/tokenUpdater";
import baseColors from "../../common/baseColors";
import ShopProductLists from "../ShopProducts/ShopProductLists";

const ShopProductNav = () => {
  const route = useRoute();
  const { shopId, shopName } = route.params;
  const [shopProducts, setShopProducts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const getShop = async () => {
        setIsLoading(true);
        const token = await AsyncStorage.getItem("entamarketToken");
        await entamarketApi
          .get(`/shop/get-shop?shopID=${shopId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            setToken(resp.data.entamarketToken);
            setShopProducts(resp.data.shopData.products);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      };

      getShop();
    }, [])
  );

  const navigateToAddProducts = () => {
    navigation.navigate("AddProduct", { shopId, shopName });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          style={styles.loaderStyle}
          color={baseColors.primaryColor}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container2}>
        {shopProducts.length === 0 ? (
          <View>
            <OopsError
              type={`${shopName} currently don't have Products, Please Stock up this shop. `}
            >
              <TouchableOpacity
                style={styles.btnAddProd}
                onPress={navigateToAddProducts}
              >
                <Text style={styles.btnText}>Add Products</Text>
              </TouchableOpacity>
            </OopsError>
          </View>
        ) : (
          <View>
            <ShopProductLists
              data={shopProducts}
              shopId={shopId}
              shopName={shopName}
            />
          </View>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
  },
  container2: {
    backgroundColor: "#eee",
    flex: 1,
    paddingHorizontal: 10,
  },
  btnAddMore: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  loaderStyle: {
    marginTop: 150,
    color: baseColors.primaryColor,
  },

  btnAddProd: {
    backgroundColor: baseColors.primaryColor,
    paddingVertical: 13,
    paddingHorizontal: 26,
    borderRadius: 100,
  },
  btnAddMoreText: {
    color: baseColors.primaryColor,
    // fontWeight: 600,
    fontSize: 16,
  },
  btnText: {
    color: "#fff",
  },
});
export default ShopProductNav;
