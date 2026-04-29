import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import entamarketApi from "../../api/entamarketApi";
import PendingInfo from "../../UIComponents/PendingInfo/PendingInfo";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import DialogueModal from "../../UIComponents/Dialogue-Modal/Dialogue-Modal";

const PendingOrderSeller = () => {
  const route = useRoute();
  const id = route.params.id;
  const [orderInfo, setOrderInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const getPendingOrder = async () => {
      const token = await AsyncStorage.getItem("entamarketToken");
      const header = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await entamarketApi
        .get(
          `/delivery/get-single-trader-pending-delivery?deliveryID=${id}`,
          header
        )
        .then((resp) => {
          setOrderInfo(resp.data.pendingDelivery);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    getPendingOrder();
  }, []);

  const confirmDeliveryHandler = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("entamarketToken");
    const header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await entamarketApi
      .delete(`/delivery/confirm-delivery?checkoutID=${id}`, header)
      .then((resp) => {
        setLoading(false);
        setShowConfirm(false);
        navigation.navigate("Dashboard");
      })
      .catch((err) => console.log(err.data));
  };

  const BackTodashboard = () => {
    navigation.navigate("Dashboard");
  };

  const showHandDialogue = () => {
    setShowConfirm(false);
  };

  if (loading) {
    return <ActivityIndicator style={styles.indicator} size={"large"} />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#eee",
      }}
    >
      <ScrollView style={styles.container}>
        <View key={orderInfo._id}>
          <PendingInfo
            prodName={orderInfo.product.name}
            img={orderInfo.product.images[0]}
            price={orderInfo.product.price}
            quantity={orderInfo.quantity}
            typeName="Buyer"
            sellerName={`${orderInfo.buyer.firstName} ${orderInfo.buyer.lastName}`}
            sellerContact={orderInfo.buyer.phoneNumber}
          />
        </View>

        <View style={styles.mainBoxBtn}>
          <ButtonPrimary value="Back" btnAction={BackTodashboard} />
        </View>

        <DialogueModal
          visible={showConfirm}
          handleHideDialogue={showHandDialogue}
          actionBtn={confirmDeliveryHandler}
          dialogueMessage="Are you sure you want to confirm this delivery"
          actionBtnName="Confirm"
          dialogueTitle="Confirm Delivery"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 11,
  },
  mainBoxBtn: {
    marginBottom: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  indicator: {
    marginTop: 40,
  },
});

export default PendingOrderSeller;
