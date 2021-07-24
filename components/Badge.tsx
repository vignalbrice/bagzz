import React from "react";
import { StyleSheet, Text, View } from "react-native";

type BadgeProps = {
  data: Array<any>;
};

const Badge = ({ data }: BadgeProps) => {
  if (data.length > 0) {
    return (
      <View style={styles.checkoutLayer}>
        <View style={styles.checkoutItem}>
          <Text style={styles.checkoutText}>{data.length}</Text>
        </View>
      </View>
    );
  } else return null;
};

export default Badge;

const styles = StyleSheet.create({
  checkoutLayer: {
    position: "absolute",
    top: -13,
    left: 15,
    borderRadius: 50,
    backgroundColor: "#FFF",
    padding: 1.5,
  },
  checkoutText: {
    color: "#FFF",
    fontFamily: "Work-SansSemiBold",
    fontSize: 14,
  },
  checkoutItem: {
    borderRadius: 50,
    width: 20,
    height: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
