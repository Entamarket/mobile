import { View, StyleSheet } from "react-native";
import { bodyContainer } from "../../common/styles";
import HomeProductLists from "../HomeProducts/HomeProductLists";

export default function HomeProducts({ data }) {
  return (
    <View style={styles.bodyContainer}>
      <HomeProductLists data={data} />
    </View>
  );
}
const styles = StyleSheet.create({
  bodyContainer,
});
