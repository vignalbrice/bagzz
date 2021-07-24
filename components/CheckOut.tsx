import { FontAwesome } from "@expo/vector-icons";
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
import { addItem, removeItem } from "../store/slices/app";
import Layout from "../constants/Layout";

type CheckOutProps = {
  data: [];
};

type CheckOutItemProps = {
  item: {
    key: number;
    title: string;
    subtitle: string;
    referenceNumber: string;
    price: string;
    nbItems: number;
    image: ImageSourcePropType;
  };
  index: number;
};

const CheckOut = ({ data }: CheckOutProps) => {
  const dispatch = useDispatch();

  const CheckOutItem = ({ item, index }: CheckOutItemProps) => {
    return (
      <View
        style={{
          flex: 1,
          minWidth: 170,
          marginBottom: 20,
          marginTop: 10,
          marginHorizontal: 5,
          flexDirection: "row",
          marginVertical: 5,
        }}
      >
        <View
          style={{
            marginTop: -15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={item.image} style={styles.itemImage} />
          <View
            style={{
              borderWidth: 1,
              borderColor: "#000",
              height: 25.38,
              width: 87,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                alignItems: "center",
                justifyContent: "center",
                width: 29,
              }}
              onPress={() => dispatch(removeItem(item.key))}
            >
              <FontAwesome name='minus' size={14} color='#FFF' />
            </TouchableOpacity>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text>{item.nbItems}</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                alignItems: "center",
                justifyContent: "center",
                width: 29,
              }}
              onPress={() => dispatch(addItem(item.key))}
            >
              <FontAwesome name='plus' size={14} color='#FFF' />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
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
          <TouchableOpacity>
            <Text
              style={{
                textTransform: "uppercase",
                marginBottom: 4,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              ${item.price}
            </Text>
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
      data={data}
      scrollEnabled
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{ borderColor: "#000000", borderWidth: 1 }} />
      )}
      renderItem={({ item, index }: CheckOutItemProps) => (
        <CheckOutItem item={item} index={index} />
      )}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      extraData={data}
    />
  ) : (
    <View style={styles.noItemView}>
      <FontAwesome name='exclamation-circle' size={40} color='black' />
      <Text style={styles.noItemText}>No items in checkout list</Text>
    </View>
  );
};

export default CheckOut;

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
