import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../constants/Layout";
import { favoritesSelector, setFavoriteItem } from "../store/slices/app";

type WishListProps = {
  data: [];
};

type WishListItemProps = {
  item: {
    key: number;
    title: string;
    subtitle: string;
    referenceNumber: string;
    action: string;
    image: ImageSourcePropType;
  };
  index: number;
};

const WishList = ({ data }: WishListProps) => {
  const WishListItem = ({ item, index }: WishListItemProps) => {
    const dispatch = useDispatch();
    return (
      <View
        style={{
          flex: 1,
          minWidth: 170,
          marginBottom: 20,
          marginTop: 20,
          marginHorizontal: 5,
          flexDirection: "row",
          marginVertical: 5,
        }}
      >
        <View style={{ marginTop: -10 }}>
          <Image source={item.image} style={styles.itemImage} />
        </View>
        <View>
          <Text
            style={{
              fontFamily: "PlayfairDisplay-Bold",
              fontSize: 18,
              marginBottom: 15,
            }}
          >
            {item.title}
          </Text>
          <View>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              {item.subtitle}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#848484",
                marginBottom: 15,
              }}
            >
              {item.referenceNumber}
            </Text>
          </View>
          <TouchableOpacity onPress={() => dispatch(setFavoriteItem(item))}>
            <Text
              style={{
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              remove
            </Text>
            <View
              style={{ borderBottomColor: "#000", borderWidth: 2, width: 60 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return data.length > 0 ? (
    <FlatList
      style={{ maxHeight: Layout.window.height / 2 }}
      contentContainerStyle={{
        marginVertical: data.length <= 2 ? 30 : 0,
      }}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      data={data}
      ItemSeparatorComponent={() => (
        <View style={{ borderColor: "#000000", borderWidth: 1 }} />
      )}
      renderItem={({ item, index }: WishListItemProps) => (
        <WishListItem item={item} index={index} />
      )}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      extraData={data}
    />
  ) : (
    <View style={styles.noItemView}>
      <FontAwesome name='exclamation-circle' size={40} color='black' />
      <Text style={styles.noItemText}>No items in favorites list</Text>
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  itemImage: {
    width: 111,
    height: 111,
  },
  noItemText: {
    fontFamily: "PlayfairDisplay-Bold",
    fontSize: 20,
    color: "#000",
  },
  noItemView: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
});
