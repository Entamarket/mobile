import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartCard from "../../UIComponents/CartCard/CartCard";
import { useSelector } from "react-redux";
import Error from "../../UIComponents/Error/Error";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../Slice/Cart-Slice";
import { convertPrice } from "../../utilities/convertPrice";
import { useNavigation } from "@react-navigation/native";

const AddToCartUI = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const cartError = useSelector((state) => state.cartSlice.cartError);
  let price = 0;

  useEffect(() => {
    const getCartItems = async () => {
      await AsyncStorage.getItem("cartItems").then((item) => {
        const items = JSON.parse(item);
        if (item === null) {
          setCartItems([]);
        } else {
          setCartItems(items);
        }
      });
    };
    getCartItems();
  }, [isRender]);

  const getTotalPrice = () => {
    for (let item of cartItems) {
      price += parseInt(item.productPrice) * item.productQuant;
    }
    return price;
  };

  const removeCartItem = async (id) => {
    let filteredCart = cartItems.filter((e) => e.id !== id);
    setIsRender(!isRender);
    await AsyncStorage.setItem("cartItems", JSON.stringify(filteredCart));
    dispatch(cartSliceActions.setCartError(""));
  };

  const IncreaseQunatity = async (id) => {
    const findItem = cartItems.find((element) => element.id === id);
    findItem.productQuant += 1;

    await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems)).then(
      () => {
        setIsRender(!isRender);
      }
    );
  };

  const decreaseQunatity = async (id) => {
    const findItem = cartItems.find((element) => element.id === id);
    if (findItem.productQuant <= 1) {
      return false;
    } else {
      findItem.productQuant -= 1;
      await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems)).then(
        () => {
          setIsRender(!isRender);
        }
      );
    }
  };

  const goToCheckOutOverview = () => {
    dispatch(cartSliceActions.setCartError(""));
    navigation.navigate("checkOutOverview");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          {/* <View style={styles.signTextCon}>
            <AntDesign name="shoppingcart" size={26} />
            <Text style={styles.signInText}>Cart Items</Text>
          </View> */}

          {cartError !== "" ? <Error text={cartError} /> : null}

          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              return (
                <View key={item.id}>
                  <CartCard
                    prodName={item.productName}
                    prodPrice={item.productPrice}
                    img={item.productImage}
                    productQuant={item.productQuant}
                    removeCartItem={() => removeCartItem(item.id)}
                    IncreaseQunatity={() => IncreaseQunatity(item.id)}
                    decreaseQunatity={() => decreaseQunatity(item.id)}
                  />
                </View>
              );
            })
          ) : (
            <View style={styles.cartErr}>
              <Text>Your Cart is Empty</Text>
            </View>
          )}

          {cartItems.length > 0 ? (
            <>
              <View style={styles.totalBox}>
                <Text style={styles.totalPriceText}>
                  Total Price: {convertPrice(getTotalPrice())}
                </Text>
              </View>
              <ButtonPrimary
                value="Checkout"
                btnAction={goToCheckOutOverview}
              />
            </>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  signInText: {
    fontSize: 20,
    // fontWeight: 900,
    marginLeft: 10,
  },
  scrollContainer: {
    height: 700,
  },
  forgotText: {
    marginVertical: 10,
    // fontWeight: 600,
  },
  formContainer: {
    marginVertical: 2,
    marginHorizontal: 15,
  },
  signupText: {
    fontSize: 14,
    marginBottom: 10,
  },
  signTextCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cartErr: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: "center",
  },
  totalPriceText: {
    fontSize: 16,
    // fontWeight: 700,
  },
  totalBox: {
    marginVertical: 10,
  },
});

export default AddToCartUI;
