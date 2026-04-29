import { View, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import baseColors from "../../common/baseColors";

export default function Search() {
  const navigation = useNavigation();
  const searchQuery = useSelector((state) => state.searchSlice.searchQuery);

  const handleSearchNavigation = () => {
    navigation.navigate("Search");
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemSearchBox}>
        <MaterialIcons name="search" size={18} color="#6b7280" />
        <TextInput
          placeholder="Search items on Entamarket"
          style={styles.searchInput}
          placeholderTextColor="#6b7280"
          onFocus={handleSearchNavigation}
          value={searchQuery}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  itemSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: baseColors.greyLight,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 100,
  },
  searchInput: {
    flex: 1,
    marginLeft: 7,
    fontSize: 14,
  },
});
