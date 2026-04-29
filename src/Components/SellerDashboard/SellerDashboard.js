import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import baseColors from "../../common/baseColors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import PendingButton from "../../UIComponents/PendingButton/PendingButton";
import { useState, useCallback } from "react";
import entamarketApi from "../../api/entamarketApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SliceActions } from "../../Slice/Auth-Slice";
import { useDispatch } from "react-redux";
import NoPendingOrder from "../../UIComponents/NoPendingOrder/NoPendingOrder";
import { useFocusEffect } from "@react-navigation/native";
import { convertPrice } from "../../utilities/convertPrice";
import DashboardDrawer from "../../UIComponents/DashboardDrawer/DashboardDrawer";
import CreateShopModal from "../../UIComponents/CreateShopModal/CreateShopModal";
import LoadingModal from "../../UIComponents/LoadingModal";
import UseCreateShopHandler from "../../hooks/UseCreateShopHandler";
import { useNavigation } from "@react-navigation/native";
import VerficationModal from "../../UIComponents/Verification-Modal/VerificationModal";
import PendingVerifyModal from "../../UIComponents/Pending-verifyModal/Pending-VerifyModal";

export default function SellerDashboard() {
  const navigation = useNavigation();
  const [
    error,
    setShopData,
    createShopErrorHandler,
    isLoading,
    setError,
    isModal,
    setIsModal,
  ] = UseCreateShopHandler();

  const dispatch = useDispatch();
  const [sellerData, setSellerData] = useState(false);
  const [pendingData, setpendingData] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState();
  const [showVerifyBox, setshowVerifyBox] = useState(false);
  const [prodLength, setProdLength] = useState(0);
  const [sales, setSales] = useState([]);
  const [pendModal, setIsPendModal] = useState(false);
  const [acctStatus, setAcctStatus] = useState("");

  const navigationHandler = () => {
    navigation.navigate("SellerDetails");
    setShowSideDrawer(false);
  };

  const navigateToRequestPayment = async () => {
    const token = await AsyncStorage.getItem("entamarketToken");
    const header = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    };
    await entamarketApi
      .get("/trader/dashboard/request-withdrawal", header)
      .then((resp) => {
        navigation.navigate("RequestPayment", {
          bankInfo: resp.data.bankDetails,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getSellerDashboard = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("entamarketToken");

    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await entamarketApi.get("/trader/dashboard", headers).then((resp) => {
        setSellerData(resp.data.traderData);
        let prodLength = 0;
        for (let shop of resp.data.traderData.shops) {
          prodLength += shop.products.length;
        }
        setProdLength(prodLength);
        if (resp.data.traderData.confirmedTrader === null) {
          setshowVerifyBox(true);
          setAcctStatus(resp.data.traderData.confirmedTrader);
        } else if (resp.data.traderData.confirmedTrader === false) {
          setIsPendModal(true);
          setAcctStatus(resp.data.traderData.confirmedTrader);
        } else {
          setAcctStatus("");
        }
      });
      await entamarketApi
        .get(`/delivery/get-trader-pending-deliveries?set=${count}`, headers)
        .then((resp) => {
          setIsLoading(false);
          setIsSeller(true);
          if (resp.data.msg === "no more pending deliveries") {
            setpendingData(false);
          } else {
            setpendingData(resp.data.pendingDeliveries);
          }
        });
      await entamarketApi
        .get(`/trader/get-sales-history?set=${count}`, headers)
        .then((resp) => {
          setSales(resp.data.salesHistoryData);
        });
    } catch (error) {
      if (error.response.data.msg === "Unauthorized") {
        await AsyncStorage.removeItem("entamarketToken");
        dispatch(SliceActions.setUserData(false));
        setIsLoading(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSellerDashboard();
    }, [count])
  );

  const IncreaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count === 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };

  const showSideDrawerMenu = () => {
    setShowSideDrawer(true);
  };

  const closeShowDrawerMenu = () => {
    setShowSideDrawer(false);
  };

  const closeCreateShopModal = () => {
    setIsModal(false);
  };

  const gotoShopsHandler = () => {
    navigation.navigate("shopNav", { status: acctStatus });
  };

  const viewPendingOrder = async (id) => {
    navigation.navigate("PendingSeller", { id });
  };

  const handleProductNavigation = () => {
    navigation.navigate("ProductUI");
  };

  const closeVerifyBox = () => {
    setshowVerifyBox(false);
  };

  const closePendModal = () => {
    setIsPendModal(false);
  };
  const navigateToSellerVerification = () => {
    navigation.navigate("SellerVerification");
    setshowVerifyBox(false);
  };

  const getSalesHistory = () => {
    navigation.navigate("salesHistory");
  };

  return (
    <SafeAreaView style={styles.container}>
      {showVerifyBox ? (
        <VerficationModal
          showVerifyBox={showVerifyBox}
          closeVerifyBox={closeVerifyBox}
          sellerNav={navigateToSellerVerification}
        />
      ) : null}

      {pendModal ? (
        <PendingVerifyModal
          showVerifyBox={pendModal}
          closeVerifyBox={closePendModal}
        />
      ) : null}

      <DashboardDrawer
        showSideDrawer={showSideDrawer}
        closeShowDrawerMenu={closeShowDrawerMenu}
        setCreateShop={setIsModal}
        setshowSideDrawer={setShowSideDrawer}
        navigationHandler={navigationHandler}
        navigateToRequestPayment={navigateToRequestPayment}
        confirmTrader={sellerData.confirmedTrader}
        setshowVerifyBox={setshowVerifyBox}
        setIsPendModal={setIsPendModal}
      />

      <CreateShopModal
        visible={isModal}
        closeCreateShopModal={closeCreateShopModal}
        createAct={createShopErrorHandler}
        changeText1={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });
          setShopData((prev) => {
            return {
              name: text,
              shopAddress: prev.shopAddress,
            };
          });
        }}
        changeText2={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });
          setShopData((prev) => {
            return {
              name: prev.name,
              shopAddress: text,
            };
          });
        }}
        error={error}
      />

      <View style={styles.headerNav1}>
        <View style={styles.headerNav}>
          <MaterialCommunityIcons
            name="account"
            color={baseColors.primaryColor}
            style={styles.iconStyle}
          />

          <Text style={styles.headerName}>
            Hi {isSeller ? sellerData.username : null}
          </Text>
        </View>

        <TouchableOpacity onPress={showSideDrawerMenu}>
          <View style={styles.headerNav}>
            <Ionicons
              name="menu"
              color={baseColors.primaryColor}
              style={styles.iconStyle2}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.bodyMain}>
        <View style={[styles.acctBox, styles.acctBox1]}>
          <Ionicons
            name="ios-wallet-outline"
            color="#fff"
            style={styles.acctIcon}
          />
          <Text style={styles.text1}>Balance </Text>
          <Text style={styles.text2}>
            {sellerData !== false
              ? convertPrice(sellerData.accountBalance)
              : null}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.acctBox, styles.acctBox2]}
          onPress={gotoShopsHandler}
        >
          <Ionicons
            name="md-cart-outline"
            color="black"
            style={styles.acctIcon2}
          />
          <Text style={styles.text3}>Shops </Text>
          <Text style={styles.text4}>
            {sellerData !== false ? sellerData.shops.length : null}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.acctBox, styles.acctBox2]}
          onPress={getSalesHistory}
        >
          <Ionicons
            name="megaphone-outline"
            color="black"
            style={styles.acctIcon2}
          />
          <Text style={styles.text3}>Sales </Text>
          <Text style={styles.text4}>
            {sales.length > 0 ? sales.length : 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.acctBox, styles.acctBox1]}
          onPress={handleProductNavigation}
        >
          <Ionicons name="car" color="#fff" style={styles.acctIcon} />
          <Text style={styles.text1}>Products</Text>
          <Text style={styles.text2}>{prodLength}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bodyMain2}>
        {/* Quick Access Nav*/}
        <Text style={styles.quickText}>Quick Access</Text>
        <ScrollView
          style={styles.navIconBox}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.iconBox1}>
            <TouchableOpacity
              onPress={() => {
                if (sellerData.confirmedTrader === null) {
                  setshowVerifyBox(true);
                } else if (sellerData.confirmedTrader === false) {
                  setIsPendModal(true);
                } else {
                  setIsModal(true);
                }
              }}
            >
              <View style={styles.navIcon}>
                <Entypo name="shop" size={16} />
                <Text style={styles.navText}>Create Shop</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={gotoShopsHandler}>
              <View style={styles.navIcon}>
                <Entypo name="upload" size={15} />
                <Text style={styles.navText}>Add Product</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={gotoShopsHandler}>
              <View style={styles.navIcon}>
                <FontAwesome5 name="edit" size={14} />
                <Text style={styles.navText}>Edit Product</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={navigationHandler}>
              <View style={styles.navIcon}>
                <MaterialCommunityIcons name="bank" size={14} />
                <Text style={styles.navText}>Payment Account</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* Quick Access Nav End*/}

        <View>
          <Text style={styles.pendingText}>Pending Orders</Text>
        </View>

        {!loading ? (
          <ScrollView style={styles.scrollBox}>
            {pendingData.length > 0
              ? pendingData.map((item) => {
                  return (
                    <View key={item._id}>
                      <PendingButton
                        typeName="Pending Order awaiting delivery"
                        viewPendingOrder={() => viewPendingOrder(item._id)}
                      />
                    </View>
                  );
                })
              : null}

            {pendingData.length > 0 ? (
              <View style={styles.btnContainers}>
                <TouchableOpacity
                  style={[styles.btn, styles.btnColor1]}
                  onPress={IncreaseCount}
                >
                  <Text style={styles.textColor}>Load More</Text>
                </TouchableOpacity>

                {count > 0 ? (
                  <TouchableOpacity
                    style={[styles.btn, styles.btnColor2]}
                    onPress={decreaseCount}
                  >
                    <Text style={styles.textCon}>Back</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}

            {pendingData === false ? (
              <NoPendingOrder countData={count} actionBtn={decreaseCount} />
            ) : null}
          </ScrollView>
        ) : (
          <ActivityIndicator
            size="large"
            color={baseColors.primaryColor}
            style={styles.indicator}
          />
        )}
      </View>

      <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  indicator: {
    marginTop: 40,
  },
  iconStyle: {
    fontSize: 27,
  },
  headerNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  headerNav1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  headerName: {
    fontSize: 17,
  },
  bodyMain: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  text2: {
    color: "#fff",
    fontSize: 16,
  },
  text3: {
    color: "black",
    fontSize: 15,
  },
  text4: {
    color: "black",
    fontSize: 16,
  },
  bodyMain2: {
    padding: 20,
  },
  pendingText: {
    fontWeight: "500",
    fontSize: 15,
    marginBottom: 5,
  },
  acctBox: {
    paddingVertical: 13,
    textAlign: "center",
    borderRadius: 10,
    alignItems: "center",
  },
  acctBox1: {
    width: "45%",
    backgroundColor: baseColors.primaryColor,
    justifyContent: "center",
    marginBottom: 8,
  },
  acctBox2: {
    backgroundColor: baseColors.secondaryColor,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  acctIcon: {
    fontSize: 25,
  },
  acctIcon2: {
    fontSize: 23,
  },
  text1: {
    fontWeight: "600",
    color: "#fff",
    marginHorizontal: 10,
  },
  scrollBox: {
    height: 250,
  },
  btnContainers: {
    flexDirection: "row",
    alignContent: "center",
    margin: 10,
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
    fontWeight: "400",
  },
  iconBox1: {
    flexDirection: "row",
  },
  quickText: {
    fontSize: 15,
    fontWeight: "500",
    marginVertical: 5,
  },
  navIconBox: {
    flexDirection: "row",
    marginBottom: 15,
  },
  navText: {
    marginLeft: 5,
    fontSize: 14,
  },
  navIcon: {
    marginRight: 10,
    backgroundColor: "#f7f3fa",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle2: {
    color: "grey",
    fontSize: 27,
    paddingRight: 20,
  },
});
