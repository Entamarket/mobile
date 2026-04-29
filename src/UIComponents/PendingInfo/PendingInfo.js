import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { convertPrice } from "../../utilities/convertPrice";

const PendingInfo = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: props.img }} style={styles.img} />
      </View>

      <View style={styles.pendingDetails}>
        <View style={[styles.pendigInfo, styles.pedingInfoName]}>
          <Text style={styles.pendingTopVal}>Product Name</Text>
          <Text style={styles.pendingBottomVal}>{props.prodName}</Text>
        </View>
        <View style={[styles.pendigInfo, styles.pedingInfoName]}>
          <Text style={styles.pendingTopVal}>Product Price</Text>
          <Text style={styles.pendingBottomVal}>
            {convertPrice(props.price)}
          </Text>
        </View>

        <View style={[styles.pendigInfo, styles.pedingInfoName]}>
          <Text style={styles.pendingTopVal}>Order Quantity</Text>
          <Text style={styles.pendingBottomVal}>{props.quantity}</Text>
        </View>

        <View style={[styles.pendigInfo, styles.pedingInfoName]}>
          <Text style={styles.pendingTopVal}>Status</Text>
          <Text style={styles.pendingBottomVal}>Pending</Text>
        </View>

        <View style={[styles.pendigInfo, styles.pedingInfoName]}>
          <Text style={styles.pendingTopVal}>{props.typeName}</Text>
          <Text style={styles.pendingBottomVal}>{props.sellerName}</Text>
        </View>
        <View style={[styles.pendigInfo, styles.pedingInfoName]}>
          <Text style={styles.pendingTopVal}>{props.typeName} Contact</Text>
          <Text style={styles.pendingBottomVal}>{props.sellerContact}</Text>
        </View>

        <View style={[styles.pendigInfo, styles.pedingInfoName]}>
          <Text style={styles.pendingTopVal}>Tracking Status</Text>
          <ScrollView
            style={styles.trackBox}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.trackBox1}>
              <Text style={styles.trackText}>Product with Seller</Text>
              <View style={[styles.trackProgress, styles.active]}></View>
            </View>

            <View style={styles.trackBox1}>
              <Text
                style={[
                  styles.trackText,
                  props.trackingStatus === "logistics" ? "" : styles.activeText,
                ]}
              >
                Picked Up, ready for delivery
              </Text>

              <View
                style={[
                  styles.trackProgress,
                  props.trackingStatus === "logistics"
                    ? styles.active
                    : styles.noActive,
                ]}
              ></View>
            </View>

            <View style={styles.trackBox1}>
              <View>
                <Text style={[styles.trackText, styles.activeText]}>
                  Delivery Complete
                </Text>
                <View style={[styles.trackProgress, styles.noActive]}></View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: "center",
  },
  mainContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  img: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  pendigInfo: {
    borderBottomColor: "#ccc",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  pendingDetails: {
    marginVertical: 15,
  },
  pendingTopVal: {
    color: "grey",
    marginBottom: 3,
  },
  pendingBottomVal: {
    color: "#000",
  },
  trackBox: {
    flexDirection: "row",
    marginVertical: 5,
  },
  trackProgress: {
    width: "100%",
    borderWidth: 4,
    borderRadius: 10,
  },
  noActive: {
    borderColor: "#eee",
  },
  active: {
    borderColor: "rgb(124, 182, 9)",
  },
  trackBox1: {
    marginRight: 10,
  },
  trackText: {
    fontSize: 12,
  },
  activeText: {
    color: "#aaa6a6",
  },
});
export default PendingInfo;
