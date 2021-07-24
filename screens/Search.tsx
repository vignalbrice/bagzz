import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../components/Themed";
import { SearchStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import Svg, { Path } from "react-native-svg";
import Layout from "../constants/Layout";
import { useSelector } from "react-redux";
import { bagsSelector } from "../store/slices/app";

type SearchNavigation = StackNavigationProp<SearchStackParamList, "Search">;
type SearchProps = {
  navigation: SearchNavigation;
};
type SearchItemProps = {
  item: {
    key: number;
    title: string;
  };
  index: number;
};

type BagsProps = {
  key: number;
  title: string;
};

export default function Search({ navigation }: SearchProps) {
  const bags = useSelector(bagsSelector);

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const SearchItem = ({ item, index }: SearchItemProps) => {
    return (
      <TouchableOpacity
        key={item.key}
        style={{ marginBottom: 8 }}
        onPress={() =>
          navigation.navigate("Product", {
            bagsId: item.key,
            bags: bags,
          })
        }
      >
        <Text style={styles.searchedText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  function onSearch() {
    if (search.length > 0) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = bags.filter(({ key, title }: BagsProps) => {
        // Applying filter for the inserted text in search bar
        return title.toLowerCase().includes(search.toLowerCase());
      });
      setFiltered(newData);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFiltered([]);
    }
  }

  function onResetSearch(text: string) {
    setSearch(text);
    setFiltered([]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.closeBtn}
        >
          <Svg width='15' height='15' viewBox='0 0 15 15' fill='none'>
            <Path
              d='M15 2.07255L12.8573 0L7.5 5.18173L2.14275 0L0 2.07255L5.35725 7.25427L0 12.436L2.14275 14.5085L7.5 9.32682L12.8573 14.5085L15 12.436L9.64275 7.25427L15 2.07255Z'
              fill='black'
            />
          </Svg>
        </TouchableOpacity>
        <View style={styles.searchBarView}>
          <TextInput
            autoFocus
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder='Type here to search'
            placeholderTextColor='gray'
            onKeyPress={() => onSearch()}
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => onResetSearch("")}
              style={styles.closeBtnInsideSearchBarView}
            >
              <Svg width='13' height='13' viewBox='0 0 13 13' fill='none'>
                <Path
                  opacity='0.2'
                  d='M13 1.85705L11.143 0L6.5 4.64295L1.85705 0L0 1.85705L4.64295 6.5L0 11.143L1.85705 13L6.5 8.35705L11.143 13L13 11.143L8.35705 6.5L13 1.85705Z'
                  fill='black'
                />
              </Svg>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          style={{ maxHeight: Layout.window.height / 2 }}
          contentContainerStyle={{
            marginTop: 35,
          }}
          horizontal={false}
          data={filtered}
          scrollEnabled={false}
          renderItem={({ item, index }: SearchItemProps) => (
            <SearchItem item={item} index={index} />
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          extraData={filtered}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  content: {
    width: Layout.window.width / 1.15,
    height: Layout.window.height / 1.15,
    backgroundColor: "#FFF",
  },
  closeBtn: {
    marginTop: 40,
    marginBottom: 35,
    alignSelf: "flex-end",
  },
  closeBtnInsideSearchBarView: {
    marginTop: 4,
  },
  searchBarView: {
    flexDirection: "row",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFF",
  },
  input: {
    fontSize: 21,
    paddingBottom: 15,
  },
  searchedText: {
    fontSize: 22,
    color: "#000",
  },
});
