import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { Modal, Portal } from "react-native-paper";
import baseColors from "../common/baseColors";

const LoadingModal = (props) => {
  return (
    <Portal>
      <Modal visible={props.visible} style={styles.modalContent}>
        <View style={styles.modalContainer}>
          <ActivityIndicator
            size={30}
            color={baseColors.primaryColor}
            style={styles.indicator}
          />
          <Text style={styles.loadingText}>{props.loadingLabel}</Text>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    left: "43%",
    top: "-20%",
  },
  loadingText: {
    marginLeft: 10,
  },
  indicator: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
  },
});

export default LoadingModal;
