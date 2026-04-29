import { StyleSheet, View } from "react-native";
import HeaderNav from "./HeaderNav";

export default function Header(props) {
  return (
    <View style={[styles.container, styles.body]}>
      <HeaderNav user={props.userData} isUser={props.isUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 6,
    paddingHorizontal: 10,
  },
  body: {
    backgroundColor: "#fff",
  },
});
