import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import BuyerSignin from "../Auth/BuyerSignin/BuyerSignin";
import Otp from "../Auth/OTP/OTP";
import SellerSignIn from "../Auth/SellerSignIn/SellerSignIn";
import SellerSignUp from "../Auth/SellerSignUp/SellerSignUp";
import CreateAccountScreen from "../Screens/CreateAccountScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ProductViewScreen from "../Screens/ProductViewScreen";
import BuyerSignup from "../Auth/BuyerSignup/BuyerSignup";
import OnboardingScreen from "../Screens/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SliceActions } from "../Slice/Auth-Slice";
import TabNavigator from "./TabNavigator";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import ResetOTPBuyer from "../Auth/ResetOTPBuyer/ResetOTPBuyer";
import BuyerProfile from "../Auth/BuyerProfile/BuyerProfile";
import UpdateBuyerProfile from "../Auth/UpdateBuyerProfile/UpdateBuyerProfile";
import BuyerUpdateEmail from "../Auth/BuyerUpdateEmail/BuyerUpdateEmail";
import BuyerVerifyOTP from "../Auth/BuyerVerifyOTP/BuyerVerifyOTP";
import BuyerResetPassword from "../Auth/BuyerResetPassword/BuyerResetPassword";
import ResetPasswordOTP from "../Auth/ResetPasswordOTP/ResetPasswordOTP";
import AddToCartUI from "../Components/AddToCartUI/AddToCartUI";
import CheckOut from "../Auth/CheckOut/CheckOut";
import SearchBarNav from "../Components/SearchBarNav/SearchBarNav";
import SellerOTP from "../Auth/SellerOTP/SellerOTP";
import UpdateSellerProfile from "../Auth/UpdateSellerProfile/UpdateSellerProfile";
import SellerUpdateEmail from "../Auth/SellerUpdateEmail/SellerUpdateEmail";
import SellerVerifyOTP from "../Auth/SellerVerifyOTP/SellerVerifyOTP";
import ResetSellerPasswordOTP from "../Auth/ResetSellerPasswordOTP/ResetSellerPasswordOTP";
import SellerResetPassword from "../Auth/SellerResetPassword/SellerResetPassword";
import SellerForgotPassword from "../Auth/SellerForgotPassword/SellerForgotPassword";
import ResetSellerOTP from "../Auth/ResetSellerOTP/ResetSellerOTP";
import ShopNavigation from "../Components/ShopNavigation/ShopNavigation";
import PendingOrderBuyer from "../Components/PendingOrderBuyer/PendingOrderBuyer";
import CategoryProduct from "../Screens/CategoryProduct";
import ShopProductNav from "../Components/ShopProductNav/ShopProductNav";
import AddProducts from "../Components/AddProducts/AddProducts";
import ShopSingleProduct from "../Components/ShopSingleProduct/ShopSingleProduct";
import UpdateProduct from "../Components/UpdateProduct/UpdateProduct";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import baseColors from "../common/baseColors";
import SellerBankDetails from "../Components/SellerBankDetails/SellerBankDetails";
import AddPaymentAccount from "../Components/AddPaymentAccount/AddPaymentAccount";
import RequestPayment from "../Components/RequestPayment/RequestPayment";
import ConfirmPayment from "../Components/ConfirmPayment/ConfirmPayment";
import PendingOrderSeller from "../Components/PendingOrderSeller/PendingOrderSeller";
import ProductUI from "../UIComponents/ProductUI/ProductUI";
import CustomerSupport from "../Components/CustomerSupport/CustomerSupport";
import VerifyAccount from "../Components/VerifyAccount/VerifyAccount";
import SalesHistoryUI from "../UIComponents/SalesHistoryUI/SalesHistoryUI";
import OrderHistory from "../Components/OrderHistory/OrderHistory";
import ViewOrderUI from "../UIComponents/ViewOrderUI/ViewOrderUI";
import CreateShopNav from "../Components/CreateShopNav/CreateShopNav";
import { flexItems } from "../common/styles";
import { cartSliceActions } from "../Slice/Cart-Slice";

const AppNavContainer = () => {
  const HomeStack = createStackNavigator();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.isLoggedIn.loggedIn);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const checkLogin = async () => {
      await AsyncStorage.getItem("isAuth").then((auth) => {
        if (auth !== null) {
          dispatch(SliceActions.loginAuth(true));
        }
      });
      // await AsyncStorage.removeItem("isAuth").then(() =>
      //   dispatch(SliceActions.loginAuth(false))
      // );
    };
    checkLogin();

    const getCartItems = async () => {
      const cartItems = await AsyncStorage.getItem("cartItems");

      if (cartItems === null) {
        setCartData([]);
      } else {
        setCartData(JSON.parse(cartItems));
      }
    };

    getCartItems();
  }, [loggedIn, cartData]);

  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{ animationEnabled: false }}
    >
      {loggedIn ? (
        <HomeStack.Screen
          name="HomeScreen"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <HomeStack.Screen
          name="Onboard"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      )}
      <HomeStack.Screen
        name="ProductView"
        component={ProductViewScreen}
        options={({ navigation }) => ({
          title: `Product`,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("cart");
                dispatch(cartSliceActions.setCartError(""));
              }}
              style={{ marginRight: 10 }}
            >
              <View style={flexItems}>
                <MaterialCommunityIcons name="cart-plus" size={26} />
                <Text
                  style={{
                    backgroundColor: baseColors.primaryColor,
                    borderRadius: 100,
                    color: "#fff",
                    fontSize: 10,
                    paddingVertical: 2,
                    paddingHorizontal: 6,
                    marginBottom: 12,
                  }}
                >
                  {cartData.length}
                </Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStack.Screen
        name="BuyerSignUp"
        component={BuyerSignup}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="BuyerSignIn"
        component={BuyerSignin}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="SellerSignIn"
        component={SellerSignIn}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="SellerSignUp"
        component={SellerSignUp}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Otp"
        component={Otp}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="buyerResetPassword"
        component={ForgotPassword}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="resetBuyerOtp"
        component={ResetOTPBuyer}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="BuyerProfile"
        component={BuyerProfile}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ConfirmPayment"
        component={ConfirmPayment}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="updateBuyerProfile"
        component={UpdateBuyerProfile}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="updateBuyerEmail"
        component={BuyerUpdateEmail}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="buyerVerifyOTP"
        component={BuyerVerifyOTP}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="buyerResetPass"
        component={BuyerResetPassword}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="ResetPassword"
        component={ResetPasswordOTP}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="cart"
        component={AddToCartUI}
        options={
          ({ headerShown: true }, ({ route }) => ({ title: `Cart Items` }))
        }
      />
      <HomeStack.Screen
        name="checkOutOverview"
        component={CheckOut}
        options={
          ({ headerShown: true }, ({ route }) => ({ title: `Order Checkout` }))
        }
      />
      <HomeStack.Screen
        name="Search"
        component={SearchBarNav}
        options={{ headerShown: true }}
      />

      <HomeStack.Screen
        name="SellerOTP"
        component={SellerOTP}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="PendingSeller"
        component={PendingOrderSeller}
        options={
          ({ headerShown: true }, ({ route }) => ({ title: `Pending Order` }))
        }
      />
      <HomeStack.Screen
        name="updateSellerProfile"
        component={UpdateSellerProfile}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="sellerUpdateEmail"
        component={SellerUpdateEmail}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="sellerVerifyOTP"
        component={SellerVerifyOTP}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="resetSellerOTP"
        component={ResetSellerPasswordOTP}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="resetSellerPass"
        component={SellerResetPassword}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="sellerForgotPass"
        component={SellerForgotPassword}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="resetSellerOtp"
        component={ResetSellerOTP}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="shopNav"
        component={ShopNavigation}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="Pending"
        component={PendingOrderBuyer}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen
        name="Category"
        component={CategoryProduct}
        options={
          ({ headerShown: true }, ({ route }) => ({ title: route.params.type }))
        }
      />
      <HomeStack.Screen
        name="CustomerSupport"
        component={CustomerSupport}
        options={({ headerShown: true }, ({ route }) => ({ title: `` }))}
      />
      <HomeStack.Screen
        name="RequestPayment"
        component={RequestPayment}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="SellerDetails"
        component={SellerBankDetails}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="ShopProd"
        component={ShopProductNav}
        options={({ navigation, route }) => ({
          title: `${route.params.shopName}`,
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddProduct", {
                  shopId: route.params.shopId,
                  shopName: route.params.shopName,
                })
              }
              style={{ marginRight: 10 }}
            >
              <View>
                <AntDesign
                  name="pluscircleo"
                  size={20}
                  color={baseColors.primaryColor}
                  style={{
                    backgroundColor: "#dfe3ff",
                    color: baseColors.primaryColor,
                    padding: 5,
                    borderRadius: 100,
                  }}
                />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStack.Screen
        name="AddProduct"
        component={AddProducts}
        options={
          ({ headerShown: true }, ({ route }) => ({ title: `Add Products` }))
        }
      />
      <HomeStack.Screen
        name="ProductUI"
        component={ProductUI}
        options={
          ({ headerShown: true }, ({ route }) => ({ title: `Total Products` }))
        }
      />
      <HomeStack.Screen
        name="UpdateProduct"
        component={UpdateProduct}
        options={
          ({ headerShown: true }, ({ route }) => ({ title: `Update Product` }))
        }
      />
      <HomeStack.Screen
        name="ShopSingleProd"
        component={ShopSingleProduct}
        options={
          ({ headerShown: true },
          ({ route }) => {
            return { title: `${route.params.name}` };
          })
        }
      />
      <HomeStack.Screen
        name="PaymentAccount"
        component={AddPaymentAccount}
        options={
          ({ headerShown: true },
          ({ route }) => {
            return { title: `Add Payment Account` };
          })
        }
      />
      <HomeStack.Screen
        name="SellerVerification"
        component={VerifyAccount}
        options={
          ({ headerShown: true },
          ({ route }) => {
            return { title: `Seller Verification` };
          })
        }
      />
      <HomeStack.Screen
        name="salesHistory"
        component={SalesHistoryUI}
        options={
          ({ headerShown: true },
          ({ route }) => {
            return { title: `Sales History` };
          })
        }
      />

      <HomeStack.Screen
        name="orders"
        component={OrderHistory}
        options={
          ({ headerShown: true },
          ({ route }) => {
            return { title: `Order History` };
          })
        }
      />

      <HomeStack.Screen
        name="viewOrder"
        component={ViewOrderUI}
        options={
          ({ headerShown: true },
          ({ route }) => {
            return { title: `View Order` };
          })
        }
      />

      <HomeStack.Screen
        name="createShop"
        component={CreateShopNav}
        options={
          ({ headerShown: true },
          ({ route }) => {
            return { title: `Create Shop` };
          })
        }
      />
    </HomeStack.Navigator>
  );
};

export default AppNavContainer;
