import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type FavoriteProps = {
  favorites: Array<any>;
  item: any;
};

const Favorite = ({ favorites, item }: FavoriteProps) => {
  const favoriteIndex = favorites.findIndex((el) => el.key === item);
  return favoriteIndex >= 0 ? (
    <FontAwesome name='heart' style={styles.heartIcon} color='#000' />
  ) : (
    <FontAwesome name='heart-o' style={styles.heartIcon} />
  );
};

export default Favorite;

const styles = StyleSheet.create({
  heartIcon: {
    width: 16,
    height: 12.51,
  },
});
