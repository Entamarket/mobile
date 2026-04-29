import { View, Text, FlatList } from "react-native";
import CategoryProductList from "../../Components/CategoryProducts/CategoryProductList";
import OopsError from "../../UIComponents/OopsError/OOpsError";
export default function CategoryProductLists({ data, type }) {
  const mainData = data.filter((item) => item.category === type);

  if (mainData.length > 0) {
    return (
      <View>
        <FlatList
          data={mainData}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CategoryProductList
              id={item._id}
              name={item.name}
              images={item.images}
              price={item.price}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  } else {
    return (
      <OopsError
        type={type}
        errMsg="Categrory is yet to Stocked with Products"
      />
    );
  }
}
