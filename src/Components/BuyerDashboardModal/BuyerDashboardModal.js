import { Modal, Portal } from "react-native-paper";
import { View, Text, StyleSheet, Image } from "react-native";
import { convertPrice } from "../../utilities/convertPrice";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import baseColors from "../../common/baseColors";

const BuyerDashboardModal = (props) => {
  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.dismissHandler}
        contentContainerStyle={styles.containerStyle}
      >
        {props.deliveryData.length > 0
          ? props.deliveryData.map((item) => {
              return (
                <View key={item.product._id}>
                  <View style={styles.imageBox}>
                    <Image
                      source={{ uri: item.product.images[0] }}
                      style={{
                        width: 150,
                        height: 150,
                        resizeMode: "contain",
                      }}
                    />
                  </View>

                  <View>
                    <Text>
                      <Text style={styles.prodText}>Product Name: </Text>
                      {item.product.name}
                    </Text>
                    <Text>
                      <Text style={styles.prodText}>Product Price: </Text>
                      {convertPrice(item.product.price)}
                    </Text>
                    <Text>
                      <Text style={styles.prodText}>Qunatity: </Text>
                      {item.quantity}
                    </Text>
                  </View>

                  <Text style={styles.prodText2}>Product Seller</Text>
                  <Text style={styles.prodText}>
                    <Text>Fullname: </Text>
                    {`${item.trader.firstName} ${item.trader.lastName}`}
                  </Text>
                  <Text>
                    <Text style={styles.prodText}>Phone Number: </Text>{" "}
                    {item.trader.phoneNumber}
                  </Text>
                  <Text>
                    <Text style={styles.prodText}>Username: </Text>@
                    {item.trader.username}
                  </Text>

                  <Text style={styles.noticeText}>
                    Please ensure that this Product have been delivered to you
                    before clicking the Confirm Delivey Button Below.
                  </Text>
                  <ButtonPrimary
                    value="Confirm Delivery"
                    btnAction={props.btnConfirm}
                  />
                </View>
              );
            })
          : null}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
  },
  imageBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  prodText: {
    fontSize: 15,
    // fontWeight: 500,
  },
  prodText2: {
    fontSize: 14,
    textTransform: "uppercase",
    // fontWeight: 700,
    marginTop: 20,
    marginBottom: 5,
  },
  noticeText: {
    marginVertical: 15,
    color: baseColors.primaryColor,
    // fontWeight: 500,
    fontSize: 15,
  },
});
export default BuyerDashboardModal;
