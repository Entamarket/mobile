import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import baseColors from "../../common/baseColors";
import { useNavigation } from "@react-navigation/native";

export default function CategoryList({ category }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.check}
      onPress={() => {
        navigation.navigate("Category", { type: category });
      }}
    >
      <View>
        <Text style={{ fontSize: 12 }}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    alignItems: "center",
    backgroundColor: baseColors.lightPrimaryColor,
    margin: 3,
    padding: 5,
    borderRadius: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  check: {
    marginRight: 7,
    borderRadius: 100,
    backgroundColor: "#e8dbf3",
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
});
