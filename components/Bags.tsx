import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatListProps,
  FlatList,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  favoritesSelector,
  setCheckoutItem,
  setFavoriteItem,
} from "../store/slices/app";
import Layout from "../constants/Layout";
import Heart from "./Heart";
import { FontAwesome } from "@expo/vector-icons";
import Favorite from "./Favorite";

type BagsProps = {
  data: any;
};

type BagsItemProps = {
  item: {
    key: number;
    image: ImageSourcePropType;
    title: string;
    action: string;
  };
  index: number;
};

const Bags = ({ data }: BagsProps) => {
  const BagsItem = ({ item, index }: BagsItemProps) => {
    const dispatch = useDispatch();
    const favorites = useSelector(favoritesSelector);

    return (
      <View
        style={{
          flex: 1,
          minWidth: 170,
          height: 240,
          backgroundColor: "#F1F1F1",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 5,
          marginVertical: 5,
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 10, right: 10 }}
          onPress={() => dispatch(setFavoriteItem(item))}
        >
          <Favorite favorites={favorites} item={item.key} />
        </TouchableOpacity>
        <Image source={item.image} style={styles.itemImage} />
        <Text
          style={{
            fontFamily: "PlayfairDisplay-Bold",
            fontSize: 18,
            marginBottom: 15,
          }}
        >
          {item.title}
        </Text>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => dispatch(setCheckoutItem(item))}
        >
          <Text
            style={{
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            shop now
          </Text>
          <View
            style={{ borderBottomColor: "#000", borderWidth: 2, width: 88 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      style={{ marginBottom: 40 }}
      contentContainerStyle={{
        width: Layout.window.width / 1.09,
      }}
      numColumns={2}
      horizontal={false}
      data={data}
      scrollEnabled={false}
      centerContent
      renderItem={({ item, index }: BagsItemProps) => (
        <BagsItem item={item} index={index} />
      )}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      extraData={data}
    />
  );
};

export default Bags;

const styles = StyleSheet.create({
  itemImage: {
    width: 111,
    height: 111,
  },
});
