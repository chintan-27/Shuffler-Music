import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image } from "react-native";
import { StyleSheet, Text, View } from "react-native";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: width * 0.9,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "flex-end",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: 200,
    resizeMode: "cover",
    marginHorizontal: 20,
    borderRadius: 10,
    zIndex: 0,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    color: "#fff",
    paddingHorizontal: 20,
    fontWeight: "bold",
    fontSize: 25,
  },
  info: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  subTitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    paddingLeft: 10,
  },
});
interface PlaylistCardProps {
  name: string;
  songs: number;
  followers: number;
}
const PlaylistCard = ({ name, songs, followers }: PlaylistCardProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={{ uri: "https://picsum.photos/1080/1081" }}
      />
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(0,0,0,0)", "#131314"]}
        end={{ x: 0, y: 1.4 }}
        start={{ x: 0, y: 0 }}
      />
      <Text style={styles.title}>{name}</Text>
      <View style={styles.info}>
        <Text style={styles.subTitle}>{songs} songs</Text>
        <Text style={styles.subTitle}>{followers} followers</Text>
      </View>
    </View>
  );
};

export default PlaylistCard;
