import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import { useRef } from "react";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import ButtonSecondary from "../../UIComponents/Button-Secondary/ButtonSecondary";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import Error from "../../UIComponents/Error/Error";
import { convertPrice } from "../../utilities/convertPrice";
import OrderSummaryCard from "../../UIComponents/OrderSummaryCard/OrderSummaryCard";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import CheckBox from "expo-checkbox";
import { Modal } from "react-native-paper";
import entamarketApi from "../../api/entamarketApi";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import useGetUser from "../../hooks/useGet-User";
import LoadingModal from "../../UIComponents/LoadingModal";
import { useNavigation } from "@react-navigation/native";

const AddToCartUI = () => {
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);
  const [getUserData, { user, isUser }] = useGetUser();
  const navigation = useNavigation();
  const [render, setIsRender] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkBoxActive1, setCheckBoxActive1] = useState(true);
  const [checkBoxActive2, setCheckBoxActive2] = useState(true);
  const [mainLandActive, setMainLandActive] = useState(true);
  const [isLandActive, setIsLandActive] = useState(true);
  const [mainLandValue, setMainLandValue] = useState("");
  const [isLandValue, setisLandValue] = useState("");
  const [checkBoxValue1, setCheckBoxValue1] = useState(true);
  const [checkBoxValue2, setCheckBoxValue2] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isData, setisData] = useState(false);
  const [isLogistics, setIsLogistics] = useState(false);
  const [purchaseData, setPurchaseData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [billData, setBillData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    deliveryAddress: "",
    location: "",
  });
  const cartError = useSelector((state) => state.cartSlice.cartError);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: "90%",
    marginLeft: 20,
  };

  useEffect(() => {
    const getCartItems = async () => {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("entamarketToken");

      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      if (token) {
        const cartData = await AsyncStorage.getItem("cartItems");
        if (cartData === null) {
          setCartItems([]);
        } else {
          const items = JSON.parse(cartData);
          const cartVal = items.map((data) => {
            const obj = {
              productID: data.id,
              quantity: data.productQuant,
            };
            return obj;
          });
          cartVal.push(billData);
          setCartItems(items);

          try {
            await entamarketApi
              .put("/purchase-calculator", cartVal, header)
              .then((data) => {
                setPurchaseData(data.data.purchaseDetails);
                setisData(true);
                setIsLoading(false);
              });
          } catch (error) {
            if (error.response.data === "Unauthorized") {
              await AsyncStorage.removeItem("entamarketToken");
              navigation.navigate("Home");
              setIsLoading(false);
            }
          }
        }
      } else {
        navigation.navigate("Dashboard");
      }
    };
    getCartItems();
    getUserData();
  }, [render]);

  const setDeliveryModal = () => {
    setIsModal(false);
    setIsModal2(false);
  };

  const setCheckBoxValueChange1 = () => {
    setIsModal(true);
    setCheckBoxActive1(false);
    setCheckBoxValue1("Within Lagos");
    if (checkBoxActive2 === false) {
      setCheckBoxActive2(true);
    } else {
      setCheckBoxValue1("Within Lagos");
      setCheckBoxActive1(false);
    }
  };

  const setCheckBoxValueChange2 = () => {
    setIsModal2(true);
    setCheckBoxActive2(false);
    setCheckBoxValue2("Outside Lagos");
    if (checkBoxActive1 === false) {
      setCheckBoxActive1(true);
      setCheckBoxValue2("Outside Lagos");
    } else {
      setCheckBoxValue2("Outside Lagos");
      setCheckBoxActive2(false);
    }
  };

  const setMainLandChange = () => {
    setIsModal(false);
    setMainLandActive(false);
    setIsLogistics(true);
    setIsRender(!render);
    setBillData((prev) => {
      return {
        firstName: prev.firstName,
        lastName: prev.lastName,
        phoneNumber: prev.phoneNumber,
        deliveryAddress: prev.deliveryAddress,
        location: "Mainland",
      };
    });

    if (isLandActive === false) {
      setIsLandActive(true);
    } else {
      setMainLandValue("Mainland");
      setMainLandActive(false);
    }
  };

  const setIsLandChange = () => {
    setIsModal(false);
    setIsLandActive(false);
    setIsLogistics(true);
    setIsRender(!render);
    setBillData((prev) => {
      return {
        firstName: prev.firstName,
        lastName: prev.lastName,
        phoneNumber: prev.phoneNumber,
        deliveryAddress: prev.deliveryAddress,
        location: "Island",
      };
    });
    if (mainLandActive === false) {
      setMainLandActive(true);
    } else {
      setisLandValue("IsLand");
      setIsLandActive(false);
    }
  };

  const handlePayment = () => {
    if (billData.firstName == "") {
      Alert.alert("Error", "Your Firstname is Required");
    } else if (billData.lastName === "") {
      Alert.alert("Error", "Your Lastname is Required");
    } else if (billData.phoneNumber === "") {
      Alert.alert("Error", "Your Phonenumber is Required");
    } else if (billData.deliveryAddress == "") {
      Alert.alert("Error", "Your Billing Address is Required");
    } else if (billData.location === "") {
      Alert.alert("Error", "Your Location is Required");
    } else {
      paystackWebViewRef.current.startTransaction();
    }
  };

  const sendCartItems = async () => {
    const token = await AsyncStorage.getItem("entamarketToken");
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const cartVal = cartItems.map((data) => {
      const obj = {
        productID: data.id,
        quantity: data.productQuant,
      };
      return obj;
    });

    cartVal.push(billData);
    await entamarketApi.put("/checkout/checkout", cartVal, header);
  };

  const handleClosePayment = async () => {
    await AsyncStorage.removeItem("cartItems");
    await AsyncStorage.setItem("cartItems", JSON.stringify([]));
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Paystack
          paystackKey="pk_live_c795ee5c2a919db2b0f18901be0c17503e601edf"
          billingEmail={isUser ? user.email : null}
          amount={isData ? purchaseData.total : null}
          onCancel={(e) => {
            // handle response here
          }}
          onSuccess={(res) => {
            sendCartItems();
            handleClosePayment();
          }}
          ref={paystackWebViewRef}
        />
        <View style={styles.formContainer}>
          {cartError !== "" ? <Error text={cartError} /> : null}

          <View>
            <Text style={styles.billinfoText}>1. BILING INFORMATION</Text>

            <View style={styles.nameBox}>
              <TextInputBox
                labelName="First Name"
                name="ios-person-outline"
                changeText={(text) =>
                  setBillData((prev) => {
                    return {
                      firstName: text,
                      lastName: prev.lastName,
                      phoneNumber: prev.phoneNumber,
                      deliveryAddress: prev.deliveryAddress,
                      location: prev.location,
                    };
                  })
                }
              />
              <TextInputBox
                labelName="Last Name"
                name="ios-person-outline"
                changeText={(text) =>
                  setBillData((prev) => {
                    return {
                      firstName: prev.firstName,
                      lastName: text,
                      phoneNumber: prev.phoneNumber,
                      deliveryAddress: prev.deliveryAddress,
                      location: prev.location,
                    };
                  })
                }
              />
            </View>

            <TextInputBox
              labelName="Phone Number"
              name="ios-call-outline"
              keyboardType="numeric"
              changeText={(text) =>
                setBillData((prev) => {
                  return {
                    firstName: prev.firstName,
                    phoneNumber: text,
                    lastName: prev.lastName,
                    deliveryAddress: prev.deliveryAddress,
                    location: prev.location,
                  };
                })
              }
            />
            <TextInputBox
              labelName="Biling Address"
              name="ios-location-outline"
              changeText={(text) =>
                setBillData((prev) => {
                  return {
                    firstName: prev.firstName,
                    lastName: prev.lastName,
                    phoneNumber: prev.phoneNumber,
                    deliveryAddress: text,
                    location: prev.location,
                  };
                })
              }
            />

            <Text style={styles.billinfoText}>2. DELIVERY LOCATION</Text>

            <View style={styles.checkBoxContainer}>
              <TouchableOpacity onPress={setCheckBoxValueChange1}>
                <View style={[styles.checkBoxStyle, styles.checkbox1]}>
                  <CheckBox disabled={checkBoxActive1} value={checkBoxValue1} />
                  <Text style={styles.textMain}>Within Lagos</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={setCheckBoxValueChange2}>
                <View style={styles.checkBoxStyle}>
                  <CheckBox disabled={checkBoxActive2} value={checkBoxValue2} />
                  <Text style={styles.textMain}>Outside Lagos</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxBill1}>
            <View style={styles.orderBoxCon}>
              <Text style={styles.billinfoText}>ORDER SUMMARY</Text>
            </View>

            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                return (
                  <View key={item.id}>
                    <OrderSummaryCard
                      prodName={item.productName}
                      prodPrice={item.productPrice}
                      img={item.productImage}
                      productQuant={item.productQuant}
                    />
                  </View>
                );
              })
            ) : (
              <View style={styles.cartErr}>
                <Text>Your Order Summary is Empty</Text>
              </View>
            )}

            {cartItems.length > 0 ? (
              <>
                <View style={styles.totalBox}>
                  {isData ? (
                    <Text style={styles.totalText}>
                      Transaction Fee:{" "}
                      {convertPrice(purchaseData.paymentGatewayFee)}
                    </Text>
                  ) : null}

                  {isLogistics ? (
                    <Text style={styles.totalText1}>
                      Logistics Fee: {convertPrice(purchaseData.logisticsFee)}
                    </Text>
                  ) : null}
                  <Text style={styles.totalPriceText}>
                    Total Price: {convertPrice(purchaseData.total)}
                  </Text>
                </View>
                <ButtonPrimary value="Continue" btnAction={handlePayment} />
              </>
            ) : null}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isModal}
        contentContainerStyle={containerStyle}
        onDismiss={setDeliveryModal}
      >
        <Text style={styles.textHeader}>
          Select the part of Lagos for your Delivery
        </Text>

        <View style={styles.checkBoxContainer}>
          <TouchableOpacity onPress={setMainLandChange}>
            <View style={[styles.checkBoxStyle, styles.checkbox1]}>
              <CheckBox disabled={mainLandActive} value={mainLandValue} />
              <Text style={styles.textMain}>Main Land</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={setIsLandChange}>
            <View style={styles.checkBoxStyle}>
              <CheckBox disabled={isLandActive} value={isLandValue} />
              <Text style={styles.textMain}>Island</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={isModal2}
        contentContainerStyle={containerStyle}
        onDismiss={setDeliveryModal}
      >
        <Text style={styles.textHeader}>
          For Delivery Outside of Lagos, Kindly Contact our Customer Support.
        </Text>

        <View style={styles.checkBoxContainer}>
          <ButtonSecondary
            value="Contact Customer Support"
            btnAction={() => {
              navigation.navigate("CustomerSupport");
            }}
          />
        </View>
      </Modal>

      <LoadingModal visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  nameBox: {
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
  },
  boxBill1: {
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  signInText: {
    fontSize: 20,
    // fontWeight: 900,
    marginLeft: 10,
  },
  textHeader: {
    // fontWeight: 700,
    fontSize: 15,
    marginVertical: 20,
  },
  totalText: {
    fontSize: 15,
    marginVertical: 3,
  },
  totalText1: {
    fontSize: 15,
    marginBottom: 4,
  },
  forgotText: {
    marginVertical: 10,
    // fontWeight: 600,
  },
  formContainer: {
    marginVertical: 5,
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
    marginVertical: 4,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  billinfoText: {
    // fontWeight: 700,
    fontSize: 14,
    marginVertical: 10,
  },
  checkbox1: {
    marginRight: 20,
  },
  checkBoxStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  textMain: {
    marginLeft: 7,
  },
  orderBoxCon: {
    marginTop: 10,
  },
});

export default AddToCartUI;
