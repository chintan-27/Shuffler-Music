import React from "react";
import { View, Text } from "react-native";

export const CURSOR_SIZE = 7;

const Cursor = () => {
  return (
    <View
      style={{
        height: CURSOR_SIZE * 2,
        width: CURSOR_SIZE * 2,
        borderRadius: CURSOR_SIZE,
        backgroundColor: "#ee53d3",
        borderWidth: 2,
        borderColor: "#fff",
      }}
    />
  );
};

export default Cursor;
