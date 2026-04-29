import { View, FlatList } from "react-native";
import ShopProducts from "./ShopProducts";
export default function ShopProductLists({ data, shopId, shopName }) {
  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <ShopProducts
              id={item._id}
              shopName={shopName}
              shopId={shopId}
              name={item.name}
              images={item.images}
              price={item.price}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
