import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import entamarketApi from "../../api/entamarketApi";
import setToken from "../../utilities/tokenUpdater";
import { useNavigation } from "@react-navigation/native";
import ShopUI from "../../UIComponents/ShopUI/ShopUI";
import OopsError from "../../UIComponents/OopsError/OOpsError";
import baseColors from "../../common/baseColors";
import DialogueModal from "../../UIComponents/Dialogue-Modal/Dialogue-Modal";
import EditShop from "../EditShop/EditShop";
import ShopProfile from "../../UIComponents/ShopProfile/ShopProfile";
import Toast from "react-native-root-toast";
import * as Clipboard from "expo-clipboard";
import { ScrollView } from "react-native-gesture-handler";
import Error from "../../UIComponents/Error/Error";
import { useRoute } from "@react-navigation/native";
import VerficationModal from "../../UIComponents/Verification-Modal/VerificationModal";
import PendingVerifyModal from "../../UIComponents/Pending-verifyModal/Pending-VerifyModal";
import { useFocusEffect } from "@react-navigation/native";

const ShopNavigation = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setIsRender] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shopId, setShopId] = useState("");
  const [visible, setVisible] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [shopUserName, setShopUserName] = useState("");
  const [showVerifyBox, setshowVerifyBox] = useState(false);
  const [pendModal, setIsPendModal] = useState(false);
  const route = useRoute();
  const status = route.params.status;
  const navigation = useNavigation();

  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
  });
  const [value, setValue] = useState({
    name: "",
    shopAddress: "",
    shopID: "",
  });

  useFocusEffect(
    useCallback(() => {
      const getShops = async () => {
        const token = await AsyncStorage.getItem("entamarketToken");
        const headers = {
          headers: { Authorization: `Bearer ${token}` },
        };
        await entamarketApi
          .get("/trader/dashboard", headers)
          .then((resp) => {
            setShops(resp.data.traderData.shops);
            setLoading(false);
          })
          .catch((err) => console.log(err.data));
      };
      getShops();
    }, [render])
  );

  const deleteShopHandler = async () => {
    setShowModal(false);
    setLoading(true);
    const token = await AsyncStorage.getItem("entamarketToken");
    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await entamarketApi
      .delete(`/shop/delete-shop?shopID=${shopId}`, headers)
      .then((resp) => {
        setIsRender(!render);
        setLoading(false);
        setToken(resp.data.entamarketToken);
      })
      .catch((err) => console.log(err.response.data));
  };

  const shopProductHandler = (shopId, shopName) => {
    navigation.navigate("ShopProd", { shopId, shopName });
  };

  const HandleDeleteShop = (id) => {
    setShopId(id);
    setShowModal(true);
  };

  const handleHideDialogue = () => {
    setShowModal(false);
  };
  const editHandler = (shopName, shopAdd, id) => {
    setVisible(true);
    setValue({
      name: shopName,
      shopAddress: shopAdd,
      shopID: id,
    });
  };

  const goToCreateShopNav = () => {
    if (status === null) {
      setshowVerifyBox(true);
    } else if (status === false) {
      setIsPendModal(true);
    } else {
      navigation.navigate("createShop");
    }
  };

  const closeCreateShopModal = () => {
    setVisible(false);
  };

  const handleShopProfileCopy = async () => {
    Toast.show("Copied Shop Profile Link", {
      duration: Toast.durations.SHORT,
    });
    await Clipboard.setStringAsync(
      `https://entamarket.com/shop?u=${shopUserName}`
    );
  };

  const handleEditShopsHandler = async () => {
    if (value.name === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Shop Name Required",
      });
    } else if (value.shopAddress === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Shop Address is Required",
      });
    } else {
      setError({
        isVisible: false,
        display: "none",
        errText: "",
      });
      setLoading(true);

      const token = await AsyncStorage.getItem("entamarketToken");
      const header = {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      };
      await entamarketApi
        .put(`/shop/update-shop`, value, header)
        .then((resp) => {
          setToken(resp.data.entamarketToken);
          setVisible(false);
          setLoading(false);
          setIsRender(!render);
        })
        .catch((error) => console.log(error.response.data));
    }
  };

  const shareShopHandler = (id, username) => {
    setIsShare(true);
    setShopUserName(username);
  };

  const closeShopProfileNodal = () => {
    setIsShare(false);
  };

  const openInBrowserHandler = () => {
    Linking.openURL(`https://entamarket.com/shop?u=${shopUserName}`);
  };

  const closeVerifyBox = () => {
    setshowVerifyBox(false);
  };

  const navigateToSellerVerification = () => {
    navigation.navigate("SellerVerification");
    setshowVerifyBox(false);
  };

  const closePendModal = () => {
    setIsPendModal(false);
  };

  const navigateToCreateShop = () => {
    navigation.navigate("createShop");
  };
  if (!loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <ScrollView>
          <View style={styles.formContainer}>
            <View style={styles.signTextCon}>
              <Text style={styles.signInText}>Shops</Text>
            </View>

            {shops.length === 0 ? (
              <View>
                <OopsError type="Your Shops are Currently empty Create a shop to view your shops here." />

                {error.isVisible ? <Error text={error.errText} /> : null}

                <TouchableOpacity
                  style={styles.shopBtn}
                  onPress={goToCreateShopNav}
                >
                  <Text style={styles.shopBtnText}>Create Shop</Text>
                </TouchableOpacity>
              </View>
            ) : (
              shops.map((value) => (
                <ShopUI
                  key={value._id}
                  editHandler={() =>
                    editHandler(value.name, value.shopAddress, value._id)
                  }
                  deleteHandler={() => HandleDeleteShop(value._id)}
                  shopHandler={() => shopProductHandler(value._id, value.name)}
                  shareShopHandler={() =>
                    shareShopHandler(value._id, value.username)
                  }
                  shopname={value.name}
                />
              ))
            )}

            {shops.length > 0 ? (
              <View style={styles.boxShop}>
                <TouchableOpacity onPress={navigateToCreateShop}>
                  <Text style={styles.boxShopBtn}>Create New Shop</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </ScrollView>

        {isShare ? (
          <ShopProfile
            visible={isShare}
            closeShopProfileNodal={closeShopProfileNodal}
            shopUserName={shopUserName}
            openInBrowserHandler={openInBrowserHandler}
            handleShopProfileCopy={handleShopProfileCopy}
          />
        ) : null}

        {showModal ? (
          <DialogueModal
            visible={showModal}
            handleHideDialogue={handleHideDialogue}
            dialogueTitle="Delete Shop"
            dialogueMessage="Are you sure you want to delete this Shop"
            actionBtnName="Delete"
            actionBtn={() => deleteShopHandler()}
          />
        ) : null}

        {visible ? (
          <EditShop
            handleEditShopsHandler={handleEditShopsHandler}
            closeCreateShopModal={closeCreateShopModal}
            visible={visible}
            value1={value.name}
            value2={value.shopAddress}
            changeText1={(text) => {
              setError({
                isVisible: false,
                display: "none",
                errText: "",
              });
              setValue((prev) => {
                return {
                  name: text,
                  shopAddress: prev.shopAddress,
                  shopID: prev.shopID,
                };
              });
            }}
            changeText2={(text) => {
              setError({
                isVisible: false,
                display: "none",
                errText: "",
              });
              setValue((prev) => {
                return {
                  name: prev.name,
                  shopAddress: text,
                  shopID: prev.shopID,
                };
              });
            }}
            error={error}
          />
        ) : null}

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
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.container2}>
        <ActivityIndicator
          size="large"
          style={styles.loaderStyle}
          color={baseColors.primaryColor}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  signInText: {
    fontSize: 26,
    fontWeight: "700",
  },
  forgotText: {
    marginVertical: 10,
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
    alignItems: "center",
  },
  loaderStyle: {
    marginTop: 150,
    color: baseColors.primaryColor,
  },
  container2: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
  },
  shopBtn: {
    backgroundColor: baseColors.primaryColor,
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  shopBtnText: {
    color: "#fff",
  },
  boxShop: {
    alignItems: "center",
    marginVertical: 30,
  },
  boxShopBtn: {
    backgroundColor: baseColors.primaryColor,
    color: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default ShopNavigation;
