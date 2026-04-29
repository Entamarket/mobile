import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Image, Dimensions } from "react-native";

const Carousel = () => {
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef();
  const data = [
    { image: require("../../assets/img1.jpg"), id: 1 },
    { image: require("../../assets/img2.jpg"), id: 2 },
    { image: require("../../assets/img3.jpg"), id: 3 },
  ];

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === data.length - 1) {
        flatListRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatListRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  });

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{ height: 130, width: screenWidth, resizeMode: "stretch" }}
        />
      </View>
    );
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / screenWidth;
    setActiveIndex(Math.ceil(index));
  };

  return (
    <View style={{ paddingVertical: 5, paddingHorizontal: 5 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ref={flatListRef}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

export default Carousel;
