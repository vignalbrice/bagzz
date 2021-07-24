import React from "react";
import { StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import { Modal as RNModal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  checkoutModalSelector,
  checkoutSelector,
  favoritesSelector,
  modalSelector,
  setModalVisible,
} from "../store/slices/app";
import { BlurView } from "expo-blur";
import WishList from "./WishList";
import GestureRecognizer from "react-native-swipe-gestures";
import CheckOut from "./CheckOut";

const Modal = () => {
  const modalVisible = useSelector(modalSelector);
  const modalCheckout = useSelector(checkoutModalSelector);
  const dispatch = useDispatch();
  const checkout = useSelector(checkoutSelector);
  const favorites = useSelector(favoritesSelector);

  return (
    <GestureRecognizer onSwipeDown={() => dispatch(setModalVisible(false))}>
      <RNModal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          dispatch(setModalVisible(!modalVisible));
        }}
      >
        <View style={styles.centeredView}>
          <BlurView intensity={100} style={styles.modalView} tint='default'>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#000",
                width: 125,
                marginTop: 15,
              }}
            />
            <View
              style={{
                paddingHorizontal: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {modalCheckout ? (
                <>
                  <CheckOut data={checkout} />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => dispatch(setModalVisible(!modalCheckout))}
                  >
                    <Text style={styles.textStyle}>Proceed to buy</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <WishList data={favorites} />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => dispatch(setModalVisible(!modalVisible))}
                  >
                    <Text style={styles.textStyle}>Add all to cart</Text>
                  </Pressable>
                </>
              )}
            </View>
          </BlurView>
        </View>
      </RNModal>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 40,
    width: Dimensions.get("window").width,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    bottom: -20,
    zIndex: 0,
    position: "absolute",
    height: Dimensions.get("window").height / 1.5,
  },
  button: {
    width: 190,
    height: 43,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonClose: {
    backgroundColor: "#000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Modal;
