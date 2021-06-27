import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import useMusicStore from "../state/MusicStore";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginLeft: 8,
  },

  info: {
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
  },
  review: {
    flexDirection: "row",
    marginTop: 10,
  },
  rating: {
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: "#f3b809",
    marginRight: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: 100,
    height: undefined,
    resizeMode: "cover",
    zIndex: 1,
    left: 50,
    borderRadius: 12,
  },
});
interface MusicCardProps {
  index: number;
  songName: string;
  artist: string;
}
const MusicCard = ({ index, songName, artist }: MusicCardProps) => {
  const activeSong = useMusicStore((state) => state.activeSong);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://picsum.photos/1080/1081" }}
      />
      <LinearGradient
        colors={
          activeSong === index ? ["#ee53d3", "#ff8f4f"] : ["#888", "#888"]
        }
        style={styles.circle}
      />
      <View style={styles.info}>
        <Text style={styles.title}>
          {songName.length > 15 ? `${songName.slice(0, 15)}...` : songName}
        </Text>
        <Text style={styles.subTitle}>{artist}</Text>
        <View style={styles.review}>
          <View style={styles.rating}>
            <Text>8.9</Text>
          </View>
          <Text style={styles.subTitle}>756 reviews</Text>
        </View>
      </View>
    </View>
  );
};

export default MusicCard;
