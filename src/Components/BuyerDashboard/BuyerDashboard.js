import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import baseColors from "../../common/baseColors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import PendingButton from "../../UIComponents/PendingButton/PendingButton";
import { useState, useCallback } from "react";
import entamarketApi from "../../api/entamarketApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SliceActions } from "../../Slice/Auth-Slice";
import { useDispatch } from "react-redux";
import NoPendingOrder from "../../UIComponents/NoPendingOrder/NoPendingOrder";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function BuyersDashboard() {
  const dispatch = useDispatch();
  const [buyerData, setBuyerData] = useState("");
  const [pendingData, setpendingData] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [count, setCount] = useState(0);
  const [countPurch, setCountPurch] = useState(0);
  const [historyLenghth, setHistoryLength] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const getBuyerDashboard = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("entamarketToken");
    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await entamarketApi.get("buyer/dashboard", headers).then((resp) => {
        setBuyerData(resp.data.buyerData);
      });
      await entamarketApi
        .get(`/delivery/get-pending-deliveries?set=${count}`, headers)
        .then((resp) => {
          setIsLoading(false);
          setIsBuyer(true);
          if (resp.data.msg === "no more pending deliveries") {
            setpendingData(false);
          } else {
            setpendingData(resp.data.pendingDeliveries);
          }
        });

      await entamarketApi
        .get(`/buyer/get-purchase-history?set=${countPurch}`, headers)
        .then((resp) => {
          setIsLoading(false);
          setHistoryLength(resp.data.purchaseHistoryData);
        });
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.msg === "Unauthorized") {
        await AsyncStorage.removeItem("entamarketToken");
        dispatch(SliceActions.setUserData(false));
        setIsLoading(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBuyerDashboard();
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

  const viewPendingOrder = async (id) => {
    navigation.navigate("Pending", { id });
  };

  const goToOrderHistory = () => {
    navigation.navigate("orders");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.headerNav1}>
        <View style={styles.headerNav}>
          <MaterialCommunityIcons
            name="account"
            color={baseColors.primaryColor}
            style={styles.iconStyle}
          />

          <Text style={styles.headerName}>
            Hi {isBuyer ? buyerData.username : null}
          </Text>
        </View>

        <View style={styles.headerNav}>
          <MaterialCommunityIcons
            name="bell-badge"
            color={baseColors.primaryColor}
            style={styles.iconStyle2}
          />
        </View>
      </View>

      <View style={styles.bodyMain}>
        <View style={[styles.acctBox, styles.acctBox1]}>
          <AntDesign name="gift" color="#fff" style={styles.acctIcon} />
          <Text style={styles.text1}>Pending Orders </Text>
          <Text style={styles.text2}>
            {pendingData === false ? 0 : pendingData.length}
          </Text>
        </View>

        <TouchableOpacity onPress={goToOrderHistory}>
          <View style={[styles.acctBox, styles.acctBox2]}>
            <Entypo name="list" color="black" style={styles.acctIcon2} />
            <Text style={styles.text3}>Order History</Text>
            <Text style={styles.text4}>
              {historyLenghth.length > 0 ? historyLenghth.length : 0}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.bodyMain2}>
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
    marginBottom: 10,
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
    fontSize: 18,
    marginBottom: 10,
  },
  acctBox: {
    padding: 20,
    textAlign: "center",
    borderRadius: 10,
    alignItems: "center",
  },
  acctBox1: {
    backgroundColor: baseColors.primaryColor,
    marginLeft: 10,
    marginRight: 15,
  },
  acctBox2: {
    backgroundColor: baseColors.secondaryColor,
    width: 160,
  },
  acctIcon: {
    fontSize: 25,
  },
  acctIcon2: {
    fontSize: 23,
  },
  text1: {
    color: "#fff",
    marginHorizontal: 10,
  },

  scrollBox: {
    height: 400,
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
    // fontWeight: 500,
  },

  iconStyle2: {
    color: "grey",
    fontSize: 27,
    paddingRight: 20,
  },
});
