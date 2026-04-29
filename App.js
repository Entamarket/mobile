import "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import baseColors from "./src/common/baseColors";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import AppNavContainer from "./src/navigations";
import { Provider } from "react-redux";
import store from "./src/Store/Store";
import { SafeAreaProvider } from "react-native-safe-area-context";

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: baseColors.primaryColor,
    accent: "#f1c40f",
  },
};

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider
          theme={theme}
          settings={{
            icon: (props) => <MaterialCommunityIcons {...props} />,
          }}
        >
          <AppNavContainer />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
