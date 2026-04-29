import { View, FlatList } from "react-native";
import HomeProductList from "../HomeProducts/HomeProductList";
export default function HomeProductLists({ data }) {
  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          if (item.stock > 0) {
            return (
              <HomeProductList
                id={item._id}
                name={item.name}
                images={item.images}
                price={item.price}
                stock={item.stock}
              />
            );
          }
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
