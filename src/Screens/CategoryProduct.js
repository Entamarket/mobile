import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useCallback } from "react";
import CategoryProducts from "../Components/CategoryProducts/CategoryProducts";
import Search from "../Components/Search/Search";
import { StatusBar } from "expo-status-bar";
import UseHomeProducts from "../hooks/UseHomeProducts";
import baseColors from "../common/baseColors";
import useGetUser from "../hooks/useGet-User";
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function CategoryProduct() {
  const [{ products, loading, error }, getHomeProducts] = UseHomeProducts();
  const [getUserData, { user, isUser }] = useGetUser();
  const route = useRoute();
  const type = route.params.type;

  useEffect(() => {
    getHomeProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [])
  );

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={baseColors.primaryColor}
        style={styles.indicator}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Search />
      <CategoryProducts data={products} type={type} />
      <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
