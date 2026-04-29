import { View, FlatList, StyleSheet } from "react-native";
import CategoryList from "./CategoryList";

export default function Categories() {
  const data = [
    "Vehicle",
    "Electronics",
    "Health & Beauty",
    "Electricals",
    "Fashion",
    "Groceries",
    "Babies/kids",
    "Household supplies",
    "Condiment",
    "Home/furniture appliances",
    "Construction, Tools/ repair equipment",
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return <CategoryList category={item} />;
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
