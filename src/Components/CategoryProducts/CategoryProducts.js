import { View, StyleSheet } from "react-native";
import { bodyContainer } from "../../common/styles";
import CategoryProductLists from "../../Components/CategoryProducts/CategoryProductLists";

export default function CategoryProducts({ data, type }) {
  return (
    <View style={styles.bodyContainer}>
      <CategoryProductLists data={data} type={type} />
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer,
});
