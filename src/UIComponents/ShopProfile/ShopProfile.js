import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Modal, Portal } from "react-native-paper";
import ButtonPrimary from "../Button-Primary/Button-Primary";

const ShopProfile = (props) => {
  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.closeShopProfileNodal}
        contentContainerStyle={styles.createShopBox}
      >
        <View>
          <Text style={styles.shopText}>Shop Profile</Text>
          <Text>Share your shop profile with your customized shop Link.</Text>

          <TouchableOpacity onPress={props.handleShopProfileCopy}>
            <Text style={styles.shopLink}>
              {`https://www.entamarket.com/shop?u=${props.shopUserName}`}
            </Text>
          </TouchableOpacity>

          <ButtonPrimary
            value="Open Link In Browser"
            btnAction={props.openInBrowserHandler}
          />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  createShopBox: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  createText: {
    fontSize: 18,
    // fontWeight: 700,
    alignSelf: "center",
  },
  createText2: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  shopText: {
    fontSize: 20,
    // fontWeight: 800,
  },
  shopLink: {
    marginVertical: 10,
  },
});
export default ShopProfile;
