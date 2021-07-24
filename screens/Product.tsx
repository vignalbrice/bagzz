import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Animated,
  I18nManager,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "../constants/Layout";
import { SearchStackParamList } from "../types";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import Favorite from "../components/Favorite";
import { setCheckoutItem, setFavoriteItem } from "../store/slices/app";

type SearchNavigation = StackNavigationProp<SearchStackParamList, "Search">;

type ProductProps = {
  navigation: SearchNavigation;
  route: {
    params: {
      bags: Array<any>;
      bagsId: number;
    };
  };
};

type BagsItem = {
  key: number;
  title: string;
  image: ImageSourcePropType;
  subtitle: string;
  referenceNumber: string;
  price: string;
};

interface StateProps {
  state: {
    app: any;
  };
  description: {
    detail: string;
    materialCare: string;
    materialList: Array<any>;
  };
  shipmentInfo: {
    description: string;
    returnPolicy: string;
  };
  paymentOptions: {
    title: string;
    subtitle: string;
    description: string;
  };
  favorites: Array<any>;
}

const Product = ({ navigation, route }: ProductProps) => {
  const { bags, bagsId } = route.params;
  const { description, shipmentInfo, paymentOptions, favorites } = useSelector(
    (state): StateProps => state.app
  );
  const dispatch = useDispatch();

  const Description = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        width: Layout.window.width / 1.1,
      }}
    >
      <View style={{ marginTop: 25, marginLeft: 10 }}>
        <Text
          style={{
            fontFamily: "Work-Sans",
            fontSize: 14,
            color: "#5B5B5B",
            lineHeight: 20,
          }}
        >
          {description.detail}
        </Text>
      </View>
      <View style={{ marginTop: 25, marginLeft: 10 }}>
        <Text
          style={{
            fontFamily: "Work-Sans",
            fontWeight: "500",
            fontSize: 14,
            color: "#000",
            marginBottom: 5,
          }}
        >
          Material & care
        </Text>
        <Text
          style={{
            fontFamily: "Work-Sans",
            fontSize: 14,
            color: "#5B5B5B",
            lineHeight: 20,
          }}
        >
          {description.materialCare}
        </Text>
        {description.materialList.map((item, idx) => (
          <Text
            key={idx}
            style={{
              fontFamily: "Work-Sans",
              fontSize: 14,
              color: "#5B5B5B",
              lineHeight: 20,
            }}
          >
            {item}
          </Text>
        ))}
      </View>
    </View>
  );

  const ShippingInfo = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        width: Layout.window.width / 1.1,
      }}
    >
      <View style={{ marginTop: 25, marginLeft: 10 }}>
        <Text
          style={{
            fontFamily: "Work-Sans",
            fontSize: 14,
            color: "#5B5B5B",
            lineHeight: 20,
          }}
        >
          {shipmentInfo.description}
        </Text>
      </View>
      <View style={{ marginTop: 25, marginLeft: 10 }}>
        <Text
          style={{
            fontFamily: "Work-Sans",
            fontWeight: "500",
            fontSize: 14,
            color: "#000",
            marginBottom: 5,
          }}
        >
          Return policy
        </Text>
        <Text
          style={{
            fontFamily: "Work-Sans",
            fontSize: 14,
            color: "#5B5B5B",
            lineHeight: 20,
          }}
        >
          {shipmentInfo.returnPolicy}
        </Text>
      </View>
    </View>
  );
  const PaymentOptions = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        width: Layout.window.width / 1.1,
      }}
    >
      <View style={{ marginTop: 25, marginLeft: 10 }}>
        <Text
          style={{
            fontFamily: "Work-Sans",
            fontSize: 14,
            color: "#5B5B5B",
            lineHeight: 20,
            width: Layout.window.width / 1.14,
          }}
        >
          {paymentOptions.title}
        </Text>
      </View>
      <View style={{ marginTop: 25, marginLeft: 10 }}>
        <Text
          style={{
            fontFamily: "Work-Sans",
            fontWeight: "500",
            fontSize: 14,
            color: "#5B5B5B",
            marginBottom: 5,
          }}
        >
          {paymentOptions.subtitle}
        </Text>
      </View>
      <View style={{ marginTop: 25, marginLeft: 10 }}>
        <Text
          style={{
            fontFamily: "Work-Sans",
            fontSize: 14,
            color: "#5B5B5B",
            lineHeight: 20,
          }}
        >
          {paymentOptions.description}
        </Text>
      </View>
    </View>
  );

  const renderScene = SceneMap({
    description: () => <Description />,
    shipping: () => <ShippingInfo />,
    payments: () => <PaymentOptions />,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "description", title: "Description" },
    { key: "shipping", title: "Shipping Info" },
    { key: "payments", title: "Payment Options" },
  ]);

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        activeColor='#000'
        inactiveColor='gray'
        style={{ backgroundColor: "pink" }}
        tabStyle={{
          backgroundColor: "white",
        }}
        indicatorStyle={{ border: "none" }}
        renderLabel={({ route, focused, color }) => (
          <Text
            style={{
              color,
              fontFamily: "Work-SansBold",
              fontSize: 13.5,
            }}
          >
            {route.title}
          </Text>
        )}
        renderIndicator={(props) => {
          const { position, navigationState, getTabWidth } = props;
          const inputRange = [
            0, 0.48, 0.49, 0.51, 0.52, 1, 1.48, 1.49, 1.51, 1.52, 2,
          ];

          const scale = position.interpolate({
            inputRange,
            outputRange: inputRange.map((x) => (Math.trunc(x) === x ? 2 : 0.1)),
          });

          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((x) => {
              const d = x - Math.trunc(x);
              return d === 0.49 || d === 0.51 ? 0 : 1;
            }),
          });

          const translateX = position.interpolate({
            inputRange: inputRange,
            outputRange: inputRange.map((x) => {
              const i = Math.round(x);
              return i * getTabWidth(i) * (I18nManager.isRTL ? -1 : 1);
            }),
          });

          return (
            <Animated.View
              style={[
                styles.container,
                {
                  width: `${100 / navigationState.routes.length}%`,
                  transform: [{ translateX }] as any,
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.indicator,
                  { opacity, transform: [{ scale }] } as any,
                ]}
              />
            </Animated.View>
          );
        }}
      />
    );
  };
  return bags
    .filter((el: { key: number }) => el.key === bagsId)
    .map((item: BagsItem) => (
      <View style={styles.container} key={item.key}>
        <View style={styles.contentHeader}>
          <View style={styles.header}>
            <View style={styles.headerImage}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode='contain'
                resizeMethod='auto'
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.referenceNumber}>{item.referenceNumber}</Text>
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 12,
                  marginBottom: 12,
                }}
              >
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                <Text style={styles.textButton}>Buy now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonOutline}
                activeOpacity={0.7}
                onPress={() => dispatch(setCheckoutItem(item))}
              >
                <Text style={styles.textButtonOutline}>Add to cart</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ position: "absolute", top: 0, right: 0 }}
              onPress={() => dispatch(setFavoriteItem(item))}
            >
              <Favorite favorites={favorites} item={item.key} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabViewWrapper}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            style={styles.tabView}
          />
        </View>
      </View>
    ));
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  contentHeader: {
    flex: 0.3,
  },
  content: { position: "relative", maxHeight: Layout.window.height / 3 },
  tabViewWrapper: {
    flex: 0.7,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  tabView: {
    width: Layout.window.width,
    borderColor: "#FFF",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    width: Layout.window.width / 1.1,
    height: 300,
    marginVertical: 40,
  },
  title: {
    fontFamily: "PlayfairDisplay-Bold",
    fontSize: 22,
    color: "#000",
  },
  subtitle: {
    fontFamily: "Work-Sans",
    fontSize: 14,
    color: "#000",
  },
  referenceNumber: {
    fontFamily: "Work-Sans",
    fontSize: 12,
    color: "#848484",
  },
  price: {
    fontFamily: "Work-SansBold",
    fontSize: 20,
    color: "#000",
  },
  image: {
    width: 155,
    height: 170,
  },
  headerImage: {
    width: 180,
    marginTop: -15,
  },
  button: {
    width: 95,
    height: 30,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  buttonOutline: {
    width: 95,
    height: 30,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1.6,
    borderBottomColor: "#000",
  },
  textButtonOutline: {
    color: "#000",
    fontFamily: "Work-Sans",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  textButton: {
    color: "#FFF",
    fontFamily: "Work-Sans",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  tabBar: {
    flexDirection: "row",
    marginLeft: 15,
  },
  tabItem: {
    flex: 1,
  },
  tabText: {
    fontFamily: "Work-SansBold",
    fontSize: 14,
    color: "#000",
  },
  indicator: {
    backgroundColor: "#000",
    width: 48,
    height: 30,
  },
  heartIcon: {
    width: 16,
    height: 12.51,
  },
});
