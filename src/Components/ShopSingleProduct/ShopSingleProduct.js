import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { convertPrice } from "../../utilities/convertPrice";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import entamarketApi from "../../api/entamarketApi";
import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import DialogueModal from "../../UIComponents/Dialogue-Modal/Dialogue-Modal";
import setToken from "../../utilities/tokenUpdater";
import { useNavigation } from "@react-navigation/native";
import baseColors from "../../common/baseColors";

const ShopSingleProduct = (props) => {
  const [shopProduct, setShopProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const route = useRoute();
  const { id, name, shopId, shopName } = route.params;

  useEffect(() => {
    const getShopProducts = async () => {
      await entamarketApi
        .get(`/product/get-product?productID=${id}`)
        .then((resp) => {
          setLoading(false);
          setShopProduct(resp.data.productData);
          setShow(true);
        })
        .catch((error) => {
          console.log(error.response.data);
          setLoading(false);
        });
    };

    getShopProducts();
  }, []);

  const showDeleteProductModal = () => {
    setVisible(true);
  };

  const hideDeleteProductModal = () => {
    setVisible(false);
  };

  const deleteProductHandler = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("entamarketToken");
    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await entamarketApi
      .delete(`/product/delete-product?productID=${id}`, headers)
      .then((resp) => {
        setLoading(false);
        navigation.navigate("ShopProd", { shopId, shopName });
      })
      .catch((resp) => {
        setLoading(false);
        setToken(resp.response.data.entamarketToken);
      });
  };
  const editProductHandler = () => {
    navigation.navigate("UpdateProduct", { shopId, shopName, shopProduct });
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
      <View style={styles.mainBox}>
        <View style={styles.prodEditContainer}>
          <TouchableOpacity onPress={showDeleteProductModal}>
            <Ionicons
              name="trash-outline"
              size={17}
              style={[styles.iconData, styles.icon1]}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={editProductHandler}>
            <Feather
              name="edit"
              size={18}
              style={[styles.iconData, styles.icon2]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainCon}>
          <Text style={styles.shopSingleTextTop}>Product Name</Text>
          <Text style={styles.shopSingleBottom}>{shopProduct.name}</Text>
        </View>

        <View style={styles.mainCon}>
          <Text style={styles.shopSingleTextTop}>Product Price</Text>
          <Text style={styles.shopSingleBottom}>
            {convertPrice(shopProduct.price)}
          </Text>
        </View>

        <View style={styles.mainCon}>
          <Text style={styles.shopSingleTextTop}>Product Category</Text>
          <Text style={styles.shopSingleBottom}>{shopProduct.category}</Text>
        </View>

        <View style={styles.mainCon}>
          <Text style={styles.shopSingleTextTop}>Product Stock (In Stock)</Text>
          <Text style={styles.shopSingleBottom}>{shopProduct.stock}</Text>
        </View>

        <View style={styles.mainCon}>
          <Text style={styles.shopSingleTextTop}>Product Weight</Text>
          <Text style={styles.shopSingleBottom}>{shopProduct.weight}Kg</Text>
        </View>
        <View style={styles.mainCon}>
          <Text style={styles.shopSingleTextTop}>Product Description</Text>
          <Text style={styles.shopSingleBottom}>{shopProduct.description}</Text>
        </View>

        <ScrollView
          style={styles.mainCon}
          horizontal
          contentContainerStyle={{ flexWrap: "wrap" }}
        >
          {show
            ? shopProduct.images.map((item) => {
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
              })
            : null}
        </ScrollView>
      </View>

      {visible ? (
        <DialogueModal
          visible={visible}
          dialogueTitle="Delete Product"
          handleHideDialogue={hideDeleteProductModal}
          actionBtnName="Delete"
          actionBtn={deleteProductHandler}
          dialogueMessage="Are you sure you want to delete this Product."
        />
      ) : null}
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
  iconData: {
    marginRight: 15,
    padding: 5,
    borderRadius: 100,
  },
  icon1: {
    backgroundColor: "rgb(255, 182, 182)",
    color: "rgb(245, 54, 54)",
  },
  icon2: {
    backgroundColor: "#dfe3ff",
  },
});
export default ShopSingleProduct;
