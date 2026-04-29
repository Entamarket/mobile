import { StyleSheet, Text, View, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import PendingButton from "../../UIComponents/PendingButton/PendingButton";

export default function NotificationScreen() {
  return (
    <View>
      <View style={styles.noticeContainer}>
        <MaterialCommunityIcons name="bell" style={styles.noticeIcon} />
        <Text style={styles.noticeText}>Notifications</Text>
      </View>

      <ScrollView style={styles.noticeBox}>
        {/* <PendingButton typeName="Notification from @victormak" />
        <PendingButton typeName="Notification from @igweJoy" />
        <PendingButton typeName="Notification from @Jamesp" />
        <PendingButton typeName="Notification from @jammy" />
        <PendingButton typeName="Notification from @Petered" /> */}

        <View style={styles.noNotice}>
          <Feather
            name="bell"
            color="rgba(240, 233, 233, 0.61)"
            style={styles.noPending}
          />
          <Text style={styles.noPendText}>
            You Currently Don't have Notifications, notifications will show here
            when available.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  noticeIcon: {
    fontSize: 30,
    color: "grey",
  },
  noticeBox: {
    height: 500,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  noticeText: {
    fontSize: 18,
    // fontWeight: 600,
    marginLeft: 10,
  },
  noticeContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  noPending: {
    fontSize: 200,
  },
  noPendText: {
    color: "grey",
  },
  noNotice: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
