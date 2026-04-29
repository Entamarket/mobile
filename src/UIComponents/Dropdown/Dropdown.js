import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import baseColors from "../../common/baseColors";

const Dropdown = (props) => {
  const setDropDownHandler = (item) => {
    props.setProductInfo((prev) => {
      return {
        prodName: prev.prodName,
        prodPrice: prev.prodPrice,
        prodCat: item,
        prodDesc: prev.prodDesc,
        weight: prev.weight,
        stock: prev.stock,
      };
    });
    props.setShowDropDown(false);
    props.setValue(item);
    props.setError({
      isVisible: false,
      display: "none",
      errText: "",
    });
  };

  return (
    <View style={styles.dropBoxContainer}>
      <Text style={styles.dropDownLabel}>{props.type}</Text>
      <TouchableOpacity
        style={styles.dropDownBox}
        onPress={props.showDropdownHandler}
      >
        <Text>{props.value}</Text>
        <MaterialIcons name="arrow-drop-down" size={30} />
      </TouchableOpacity>

      {props.showDropDown ? (
        <ScrollView style={styles.dropVal}>
          {props.data.map((item) => (
            <TouchableOpacity
              style={styles.dropDownValue}
              key={item}
              onPress={() => setDropDownHandler(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownLabel: {
    // fontWeight: 800,
    color: "rgb(80, 79, 79)",
    marginVertical: 5,
  },
  dropVal: {
    backgroundColor: baseColors.lightWhite,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderRadius: 5,
  },
  dropBoxContainer: {
    marginBottom: 5,
  },
  dropDownBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: baseColors.lightWhite,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderRadius: 5,
    marginHorizontal: 3,
  },
  dropDownContent: {
    backgroundColor: baseColors.lightWhite,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderRadius: 5,
    marginHorizontal: 3,
    padding: 10,
  },
  dropDownValue: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});

export default Dropdown;
