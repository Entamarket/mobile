import { View, FlatList } from "react-native";
import { useEffect, useMemo, useState } from "react";
import HomeProductList from "../HomeProducts/HomeProductList";
export default function HomeProductLists({ data }) {
  const inStock = useMemo(
    () => (Array.isArray(data) ? data.filter((p) => Number(p?.stock) > 0) : []),
    [data]
  );

  const BATCH_SIZE = 10;
  const INITIAL_COUNT = 10;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [inStock.length]);

  const visibleData = useMemo(
    () => inStock.slice(0, visibleCount),
    [inStock, visibleCount]
  );

  const loadMore = () => {
    if (visibleCount >= inStock.length) return;
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, inStock.length));
  };

  return (
    <View>
      <FlatList
        data={visibleData}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <HomeProductList
              id={item._id}
              name={item.name}
              images={item.images}
              price={item.price}
              stock={item.stock}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={INITIAL_COUNT}
        maxToRenderPerBatch={BATCH_SIZE}
        windowSize={7}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
      />
    </View>
  );
}
