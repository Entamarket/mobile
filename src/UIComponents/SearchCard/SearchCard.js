import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SearchCard(props) {
  return (
    <TouchableOpacity onPress={props.searchView}>
      <View style={styles.container}>
        <Text style={styles.text1}>{props.searchText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text1: {
    fontSize: 15,
    // fontWeight: "600",
    marginVertical: 10,
  },
});
