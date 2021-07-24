import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Layout from "../constants/Layout";

type CategoriesProps = {
  data: any;
};

type CategoriesItemProps = {
  item: any;
  index: number;
};

const Categories = ({ data }: CategoriesProps) => {
  const CategoriesItem = ({ item, index }: CategoriesItemProps) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          minWidth: 170,
          height: 240,
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={0.7}
      >
        <Image source={item.image} style={styles.categoriesImage} />
        <Text
          style={{
            position: "absolute",
            color: "#FFF",
            backgroundColor: "#000",
            right: 10,
            bottom: 8,
            padding: 8,
            fontFamily: "PlayfairDisplay-Bold",
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={{
        width: Layout.window.width / 1.09,
        marginBottom: 35,
      }}
      numColumns={2}
      horizontal={false}
      data={data}
      centerContent
      scrollEnabled={false}
      renderItem={({ item, index }: CategoriesItemProps) => (
        <CategoriesItem item={item} index={index} />
      )}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      extraData={data}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  categoriesImage: {
    width: 170,
    height: 224,
  },
});
