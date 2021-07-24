import React, { memo } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import Layout from "../constants/Layout";

type SlideProps = {
  data: {
    key: number;
    path: ImageSourcePropType;
  };
  index: number;
  currentIndex: number;
};

const Slide = memo(function Slide({ data, index, currentIndex }: SlideProps) {
  return (
    <View style={styles.slide} key={currentIndex}>
      <Image source={data.path} style={styles.slideImage} />
    </View>
  );
});

export default Slide;

const styles = StyleSheet.create({
  slide: {
    height: 205,
    width: Layout.window.width / 1.1,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: { height: 205, width: Layout.window.width / 1.1 },
});
