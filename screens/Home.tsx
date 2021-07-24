import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Bags from "../components/Bags";
import Categories from "../components/Categories";
import { useSelector } from "react-redux";
import {
  bagsSelector,
  carouselSelector,
  categoriesSelector,
} from "../store/slices/app";
import Carousel from "../components/Carousel";

export default function Home({ navigation }: any) {
  const categories = useSelector(categoriesSelector);
  const carousel = useSelector(carouselSelector);
  const bags = useSelector(bagsSelector);

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal={false}
        nestedScrollEnabled
        scrollEnabled
        removeClippedSubviews
      >
        <View style={styles.headerCarousel}>
          <Carousel source={carousel} />
        </View>
        <View style={styles.content}>
          <Bags data={bags} />
          <TouchableOpacity style={[styles.button, { width: 184 }]}>
            <Text style={{ textTransform: "uppercase" }}>Check All Latest</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 80 }}>
          <Text style={styles.textShop}>Shop by categories</Text>
          <View style={styles.content}>
            <Categories data={categories} />
            <TouchableOpacity style={[styles.button, { width: 240 }]}>
              <Text style={{ textTransform: "uppercase" }}>
                Browse all categories
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  headerCarousel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 35,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  textShop: {
    fontFamily: "PlayfairDisplay-Bold",
    fontSize: 24,
    marginHorizontal: 25,
    marginBottom: 10,
  },
});
