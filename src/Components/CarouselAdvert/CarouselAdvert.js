import { View, FlatList, Image, Dimensions, StyleSheet } from "react-native";

const CarouselAdvert = (props) => {
  const screenWidth = Dimensions.get("window").width;
  const images = [
    { id: 0, image: require("../../assets/img1.jpg") },
    { id: 1, image: require("../../assets/img2.jpg") },
    { id: 2, image: require("../../assets/img3.jpg") },
  ];

  const CarouselRender = ({ item, index }) => {
    return (
      <View style={styles.advertBanner}>
        <Image
          source={item.image}
          style={{ height: 150, width: screenWidth }}
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={images}
        renderItem={CarouselRender}
        horizontal
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  advertBanner: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
  },
});

export default CarouselAdvert;
