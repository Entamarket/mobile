import {
  SafeAreaView,
  View,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar as RNStatusBar,
} from "react-native";
import { useCallback } from "react";
import Header from "../Components/Header/Header";
import HomeProducts from "../../src/Components/HomeProducts/HomeProducts";
import Search from "../Components/Search/Search";
import Categories from "../Components/Category/Categories";
import UseHomeProducts from "../hooks/UseHomeProducts";
import useGetUser from "../hooks/useGet-User";
import { useFocusEffect } from "@react-navigation/native";
import baseColors from "../common/baseColors";
import { StatusBar } from "expo-status-bar";
import Carousel from "../Components/Carousel/Carousel";

export default function HomeScreen() {
  const [{ products, loading, error }, getHomeProducts] = UseHomeProducts();
  const [getUserData, { user, isUser }] = useGetUser();

  useFocusEffect(
    useCallback(() => {
      getUserData();
      getHomeProducts();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header userData={user} isUser={isUser} />
      <Search />
      <Carousel />
      <Categories />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={baseColors.primaryColor}
          style={styles.indicator}
        />
      ) : error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Couldn’t load products</Text>
          <Text style={styles.errorText}>{String(error)}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={getHomeProducts}>
            <Text style={styles.retryBtnText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <HomeProducts data={products} />
      )}
      <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === "android" ? (RNStatusBar.currentHeight ?? 0) + 6 : 14,
    backgroundColor: baseColors.greyLight,
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorBox: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  errorText: {
    color: baseColors.errorColor,
    marginBottom: 12,
  },
  retryBtn: {
    alignSelf: "flex-start",
    backgroundColor: baseColors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  retryBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
});
