import { View, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const OopsError = (props) => {
  return (
    <View
      style={{
        alignItems: "center",
        marginVertical: 30,
        padding: 10,
      }}
    >
      <Entypo name="emoji-sad" size={50} />
      <Text>
        Oops, {props.type} {props.errMsg}
      </Text>

      <View style={{ marginVertical: 10 }}>{props.children}</View>
    </View>
  );
};

export default OopsError;
