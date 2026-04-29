import { SafeAreaView, StatusBar } from "react-native";
import ProductView from "../Components/ProductView/ProductView";
import baseColors from "../common/baseColors";

export default function ProductViewScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={baseColors.primaryColor} style="light" />
      <ProductView />
    </SafeAreaView>
  );
}
