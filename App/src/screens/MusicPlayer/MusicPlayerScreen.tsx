import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, FontAwesome } from "@expo/vector-icons";

import { Dimensions } from "react-native";
import Header from "../../components/Header";
import CurveIndicator from "./CurveIndicator";
import Indicator from "./Indicator";
import useMusicStore from "../../state/MusicStore";
import { SharedElement } from "react-navigation-shared-element";
const { height, width } = Dimensions.get("window");
const ICON_SIZE = 24;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: undefined,
    height: height / 2,
    resizeMode: "cover",
    zIndex: 0,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    zIndex: 1,
  },
  main: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    zIndex: 2,
  },
  title: {
    height: height * 0.4,
    width: width,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  profile: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  singerBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  playerBox: {
    height: height * 0.4,
    justifyContent: "space-evenly",
  },
  player: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  options: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

interface MusicPlayerScreenProps {
  id: string;
}

const MusicPlayerScreen = ({ route }: any) => {
  const [
    music,
    start,
    stop,
    play,
    pause,
    next,
    previous,
    isPlaying,
    activeSong,
  ] = useMusicStore((state) => [
    state.music,
    state.start,
    state.stop,
    state.play,
    state.pause,
    state.next,
    state.previous,
    state.isPlaying,
    state.activeSong,
  ]);
  const data = {
    title: "Dont it",
    album: "Flames of Fame",
    singer: "The Bosshoss",
  };
  useEffect(() => {
    !isPlaying && start();
  }, []);
  return (
    <View style={styles.container}>
      <SharedElement id={"https://picsum.photos/1080/1081"}>
        <Image
          style={styles.background}
          source={{ uri: "https://picsum.photos/1080/1081" }}
        />
      </SharedElement>
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(0,0,0,0)", "#131314"]}
        end={{ x: 0, y: 0.5 }}
        start={{ x: 0, y: 0 }}
      />
      <View style={styles.main}>
        <Header left={<ChevronDown />} right={<MoreHorizontal />} />
        <View style={styles.title}>
          <Text
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: "bold",
              paddingBottom: 10,
            }}
          >
            {data.title}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 14,
              paddingBottom: 10,
            }}
          >
            From the album : {data.album}
          </Text>
          <View style={styles.singerBox}>
            <Image
              style={styles.profile}
              source={{ uri: "https://picsum.photos/100" }}
            />
            <Text
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: 14,
                paddingHorizontal: 10,
              }}
            >
              {data.singer}
            </Text>
          </View>
        </View>
        <View style={styles.playerBox}>
          <CurveIndicator />
          <View style={styles.player}>
            <Repeat />
            <Pressable
              onPress={() => {
                previous();
                console.log(activeSong);
              }}
            >
              <Previous />
            </Pressable>
            <LinearGradient
              style={{
                width: ICON_SIZE * 3,
                height: ICON_SIZE * 3,
                borderRadius: ICON_SIZE * 2,
                justifyContent: "center",
                alignItems: "center",
              }}
              start={{ x: 1, y: 1 }}
              colors={["#ee53d3", "#ff8f4f"]}
            >
              {isPlaying ? (
                <Pressable onPress={pause}>
                  <Pause />
                </Pressable>
              ) : (
                <Pressable onPress={play}>
                  <Play />
                </Pressable>
              )}
            </LinearGradient>
            <Pressable
              onPress={() => {
                next();
                console.log(activeSong);
              }}
            >
              <Next />
            </Pressable>
            <Playlist />
          </View>
          <View style={styles.options}>
            {/* <History />
            <View style={{ paddingHorizontal: 30 }}>
              <Heart />
            </View>
            <Download /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MusicPlayerScreen;

const ChevronDown = () => {
  return <Feather name="chevron-down" color="white" size={ICON_SIZE + 5} />;
};
const MoreHorizontal = () => {
  return <Feather name="more-horizontal" color="white" size={ICON_SIZE + 5} />;
};
const Pause = () => {
  return <FontAwesome name="pause" color="white" size={ICON_SIZE + 10} />;
};
const Play = () => {
  return <FontAwesome name="play" color="white" size={ICON_SIZE + 10} />;
};
const Next = () => {
  return <Feather name="skip-forward" color="white" size={ICON_SIZE} />;
};
const Previous = () => {
  return <Feather name="skip-back" color="white" size={ICON_SIZE} />;
};
const Repeat = () => {
  return <Feather name="repeat" color="white" size={ICON_SIZE} />;
};
const Playlist = () => {
  return <Feather name="list" color="white" size={ICON_SIZE} />;
};
const Heart = () => {
  return <Feather name="heart" color="white" size={ICON_SIZE} />;
};
const History = () => {
  return <Feather name="clock" color="white" size={ICON_SIZE} />;
};
const Download = () => {
  return <Feather name="download" color="white" size={ICON_SIZE} />;
};
