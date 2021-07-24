import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Layout from "../constants/Layout";
import Slide from "./Slide";

type CarouselProps = {
  source: any;
};

const Carousel = ({ source }: CarouselProps) => {
  const [idx, setIdx] = useState(0);
  const indexRef = useRef(idx);
  indexRef.current = idx;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);
    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIdx(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((s, i) => String(i), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: Layout.window.width,
        offset: index * Layout.window.width,
      }),
      []
    ),
  };

  const renderItem = useCallback(function renderItem({ item, index }) {
    return <Slide data={item} index={index} currentIndex={idx} />;
  }, []);
  console.log("render index", idx);

  return (
    <>
      <FlatList
        style={{
          width: Layout.window.width / 1.1,
          position: "relative",
          height: 205,
          flex: 1,
        }}
        data={source}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <View style={styles.titleView}>
        <Text
          style={{
            fontFamily: "PlayfairDisplay-Bold",
            fontSize: 22,
            width: 55,
            backgroundColor: "#FFF",
            paddingLeft: 5,
          }}
        >
          This
        </Text>
        <Text
          style={{
            fontFamily: "PlayfairDisplay-Bold",
            fontSize: 22,
            width: 95,
            backgroundColor: "#FFF",
            paddingLeft: 5,
          }}
        >
          season’s
        </Text>
        <Text
          style={{
            fontFamily: "PlayfairDisplay-Bold",
            fontSize: 22,
            width: 68,
            backgroundColor: "#FFF",
            paddingLeft: 5,
          }}
        >
          latest
        </Text>
      </View>
      <View style={styles.arrowView}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => setIdx(0)}
          activeOpacity={0.6}
        >
          <Svg width='29' height='24' viewBox='0 0 29 24' fill='none'>
            <Path
              d='M28.121 10.5605H6.242L14.1815 2.621L12.0605 0.5L0.5 12.0605L12.0605 23.621L14.1815 21.5L6.242 13.5605H28.121V10.5605Z'
              fill='white'
            />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => setIdx(1)}
          activeOpacity={0.6}
        >
          <Svg width='28' height='24' viewBox='0 0 28 24' fill='none'>
            <Path
              d='M0.379002 10.5605H22.258L14.3185 2.621L16.4395 0.5L28 12.0605L16.4395 23.621L14.3185 21.5L22.258 13.5605H0.379002V10.5605Z'
              fill='white'
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  arrowView: {
    flexDirection: "row",
    position: "absolute",
    top: Layout.window.height / 5.4,
    right: Layout.window.width / 13,
  },
  touchable: {
    width: 50,
    height: 50,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  titleView: {
    position: "absolute",
    right: Layout.window.width / 13,
    maxWidth: 120,
    paddingHorizontal: 10,
  },
});
