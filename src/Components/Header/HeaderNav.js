import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { flexItems } from "../../common/styles";
import { Avatar } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../Slice/Cart-Slice";
import baseColors from "../../common/baseColors";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HeaderNav(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      const getCartItems = async () => {
        const cartItems = await AsyncStorage.getItem("cartItems");
        if (!isMounted) return;
        setCartData(cartItems ? JSON.parse(cartItems) : []);
      };
      getCartItems();
      return () => {
        isMounted = false;
      };
    }, [])
  );
  const navigateToCart = () => {
    navigation.navigate("cart");
    dispatch(cartSliceActions.setCartError(""));
  };

  let nameValue = "";

  if (props.user) {
    const splitedName = props.user.username.split("");
    const name1 = splitedName[0];
    const name2 = splitedName[1];
    const name = `${name1}${name2}`;
    nameValue = name.toUpperCase();
  }

  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItems}>
        {props.user ? (
          <>
            <Avatar.Text size={32} label={nameValue} />
            <Text style={styles.userName}>{props.user.username}</Text>
          </>
        ) : (
          <View>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.imageMain}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
      <TouchableOpacity onPress={navigateToCart}>
        <View style={[styles.flexItems, styles.cartIconBox]}>
          <MaterialCommunityIcons name="cart-plus" size={24} />
          {cartData.length > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cartData.length > 99 ? "99+" : cartData.length}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexItems,
  userName: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  imageMain: {
    width: 140,
    height: 40,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  iconStyle: {
    fontSize: 22,
  },
  cartIconBox: {
    position: "relative",
    padding: 4,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -6,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 999,
    backgroundColor: baseColors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});
