import React from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
  },
});
interface HeaderProps {
  right?: React.ReactNode;
  left?: React.ReactNode;
}
const Header = ({ left, right }: HeaderProps) => {
  return (
    <View style={styles.container}>
      {left}
      {right}
    </View>
  );
};

export default Header;
