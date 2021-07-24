/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, {
  Rect,
  Path,
  Circle,
  Defs,
  Pattern,
  Image,
  Use,
} from "react-native-svg";
import useColorScheme from "../hooks/useColorScheme";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Wishlist from "../screens/Wishlist";
import Checkout from "../screens/Checkout";
import {
  BottomTabParamList,
  CheckoutStackParamList,
  HomeStackParamList,
  SearchStackParamList,
  WishlistStackParamList,
} from "../types";
import headerProps from "../components/Header";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  checkoutSelector,
  favoritesSelector,
  setCheckoutModal,
  setModalVisible,
} from "../store/slices/app";
import Product from "../screens/Product";
import Layout from "../constants/Layout";
import Badge from "../components/Badge";
import NotFoundScreen from "../screens/NotFoundScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const checkout = useSelector(checkoutSelector);
  const favorites = useSelector(favoritesSelector);

  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        activeTintColor: "#2c3e50",
        inactiveTintColor: "#000000",
        showLabel: false,
        style: styles.tabStyle,
      }}
      sceneContainerStyle={{ flex: 1, height: Layout.window.height }}
    >
      <BottomTab.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Svg width='18' height='20' viewBox='0 0 18 20' fill='none'>
              <Path
                d='M7.00012 11.9958H11.0001V18.9958H7.00012V11.9958Z'
                fill='white'
              />
              <Path
                d='M17.4201 8.1758L9.71012 0.295798C9.61715 0.20207 9.50655 0.127676 9.38469 0.0769069C9.26283 0.0261382 9.13213 0 9.00012 0C8.8681 0 8.7374 0.0261382 8.61554 0.0769069C8.49368 0.127676 8.38308 0.20207 8.29012 0.295798L0.580115 8.1858C0.393552 8.37387 0.24621 8.59712 0.146643 8.84261C0.0470768 9.08809 -0.00272978 9.35091 0.000115364 9.6158V17.9958C-0.00065946 18.5077 0.194889 19.0004 0.54649 19.3725C0.898091 19.7446 1.37898 19.9676 1.89012 19.9958H5.00012V10.9958C5.00012 10.7306 5.10547 10.4762 5.29301 10.2887C5.48055 10.1012 5.7349 9.9958 6.00012 9.9958H12.0001C12.2653 9.9958 12.5197 10.1012 12.7072 10.2887C12.8948 10.4762 13.0001 10.7306 13.0001 10.9958V19.9958H16.1101C16.6213 19.9676 17.1021 19.7446 17.4537 19.3725C17.8053 19.0004 18.0009 18.5077 18.0001 17.9958V9.6158C18.0009 9.07873 17.7929 8.56238 17.4201 8.1758Z'
                fill={color}
              />
            </Svg>
          ),
        }}
      />
      <BottomTab.Screen
        name='Search'
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <Path
                d='M19.7246 17.2913L15.8305 13.3971C15.6547 13.2214 15.4165 13.1237 15.1665 13.1237H14.5298C15.6078 11.7449 16.2484 10.0107 16.2484 8.12421C16.2484 3.63636 12.612 0 8.12421 0C3.63636 0 0 3.63636 0 8.12421C0 12.612 3.63636 16.2484 8.12421 16.2484C10.0107 16.2484 11.7449 15.6079 13.1237 14.5298V15.1665C13.1237 15.4165 13.2214 15.6547 13.3971 15.8305L17.2913 19.7246C17.6584 20.0918 18.2521 20.0918 18.6154 19.7246L19.7207 18.6193C20.0879 18.2521 20.0879 17.6584 19.7246 17.2913ZM8.12421 13.1237C5.36276 13.1237 3.12469 10.8896 3.12469 8.12421C3.12469 5.36276 5.35885 3.12469 8.12421 3.12469C10.8857 3.12469 13.1237 5.35885 13.1237 8.12421C13.1237 10.8857 10.8896 13.1237 8.12421 13.1237Z'
                fill={color}
              />
            </Svg>
          ),
        }}
      />
      <BottomTab.Screen
        name='Wishlist'
        component={WishListStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Svg width='21' height='17' viewBox='0 0 21 17' fill='none'>
              <Path
                d='M15.1477 0C13.147 0 11.4374 1.28244 10.4981 2.16658C9.55882 1.28244 7.85305 0 5.85327 0C2.40641 0 0 2.16057 0 5.25336C0 8.66117 2.98868 10.8638 5.88 12.9943C7.245 14.0012 8.65773 15.0416 9.74114 16.1953C9.92345 16.3884 10.1907 16.5 10.4714 16.5H10.5267C10.8083 16.5 11.0746 16.3876 11.256 16.1953C12.3413 15.0416 13.7531 14.0004 15.119 12.9943C18.0094 10.8647 21 8.66203 21 5.25336C21 2.16057 18.5936 0 15.1477 0Z'
                fill={color}
              />
              <Badge data={favorites} />
            </Svg>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (event) => {
            event.preventDefault();
            dispatch(setCheckoutModal(false));
            dispatch(setModalVisible(true));
          },
        })}
      />
      <BottomTab.Screen
        name='Checkout'
        component={CheckoutStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <>
              <Svg width='26' height='20' viewBox='0 0 26 20' fill='none'>
                <Path
                  d='M25.7141 8.21436V8.92864C25.7141 
                  9.52038 25.2344 10.0001 24.6427 10.0001H24.2856L23.1198 18.1602C22.969 19.2159 22.0649 20 
                  20.9985 20H4.71559C3.64922 20 2.74512 19.2159 2.59427 18.1602L1.42856 10.0001H1.07142C0.479684 
                  10.0001 0 9.52038 0 8.92864V8.21436C0 7.62262 0.479684 7.14294 1.07142 7.14294H4.0777L8.84463 0.588471C9.30869 -0.0495607 10.2021 -0.190676 10.8402 0.273384C11.4783 0.737443 11.6193 1.63088 11.1553 2.26895L7.61053 7.14294H18.1036L14.5588 2.26891C14.0948 1.63088 14.2359 0.737399 14.874 0.273339C15.512 -0.190721 16.4055 -0.0496499 16.8695 0.588426L21.6364 7.14294H24.6427C25.2344 7.14294 25.7141 7.62262 25.7141 8.21436ZM13.9285 16.0715V11.0715C13.9285 10.4797 13.4488 10.0001 12.8571 10.0001C12.2653 10.0001 11.7856 10.4797 11.7856 11.0715V16.0715C11.7856 16.6632 12.2653 17.1429 12.8571 17.1429C13.4488 17.1429 13.9285 16.6632 13.9285 16.0715ZM18.9284 16.0715V11.0715C18.9284 10.4797 18.4488 10.0001 17.857 10.0001C17.2653 10.0001 16.7856 10.4797 16.7856 11.0715V16.0715C16.7856 16.6632 17.2653 17.1429 17.857 17.1429C18.4488 17.1429 18.9284 16.6632 18.9284 16.0715ZM8.92851 16.0715V11.0715C8.92851 10.4797 8.44883 10.0001 7.85709 10.0001C7.26536 10.0001 6.78567 10.4797 6.78567 11.0715V16.0715C6.78567 16.6632 7.26536 17.1429 7.85709 17.1429C8.44883 17.1429 8.92851 16.6632 8.92851 16.0715Z'
                  fill={color}
                />
                <Badge data={checkout} />
              </Svg>
            </>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (event) => {
            event.preventDefault();
            dispatch(setCheckoutModal(true));
            dispatch(setModalVisible(true));
          },
        })}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ ...headerProps }}>
      <HomeStack.Screen name='Home' component={Home} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator screenOptions={{ ...headerProps }}>
      <SearchStack.Screen name='Search' component={Search} />
      <SearchStack.Screen name='Product' component={Product} />
    </SearchStack.Navigator>
  );
}

const WishListStack = createStackNavigator<WishlistStackParamList>();

function WishListStackNavigator() {
  return (
    <WishListStack.Navigator screenOptions={{ ...headerProps }} mode='modal'>
      <WishListStack.Screen name='Wishlist' component={Wishlist} />
      <WishListStack.Screen name='Modal' component={Modal} />
    </WishListStack.Navigator>
  );
}

const CheckoutStack = createStackNavigator<CheckoutStackParamList>();

function CheckoutStackNavigator() {
  return (
    <CheckoutStack.Navigator screenOptions={{ ...headerProps }}>
      <CheckoutStack.Screen name='Checkout' component={Checkout} />
    </CheckoutStack.Navigator>
  );
}

export const styles = StyleSheet.create({
  tabStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    paddingBottom: 0,
    zIndex: 9999,
    position: "absolute",
    bottom: 30,
    height: 65,
    backgroundColor: "#FFF",
    borderRadius: 69,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.5,
    elevation: 3,
  },
});
