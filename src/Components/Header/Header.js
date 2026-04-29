import { StyleSheet, SafeAreaView } from "react-native";
import HeaderNav from "./HeaderNav";

export default function Header(props) {
  return (
    <SafeAreaView style={[styles.container, styles.body]}>
      <HeaderNav user={props.userData} isUser={props.isUser} />
    </SafeAreaView>
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
