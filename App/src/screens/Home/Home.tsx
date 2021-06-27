import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";

import Header from "../../components/Header";
import PlaylistCard from "../../components/PlaylistCard";
import MusicCard from "../../components/MusicCard";
import { Pressable } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { useNavigation } from "@react-navigation/native";
import useMusicStore from "../../state/MusicStore";
import { useEffect } from "react";
import axios from "axios";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131314",
  },
  title: {
    fontSize: 23,
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

const Home = () => {
  const navigation = useNavigation();
  const tabHeight = useBottomTabBarHeight();
  const songs = useMusicStore((state) => state.songs);
  const handleActiveSong = useMusicStore((state) => state.handleActiveSong);
  return (
    <View style={[styles.container, { paddingBottom: tabHeight }]}>
      <Header left={<Title />} right={<Search />} />
      <View style={{ height: 200 }}>
        <ScrollView
          scrollEventThrottle={16}
          snapToInterval={width * 0.9}
          style={{ width: width }}
          overScrollMode={"never"}
          horizontal
        >
          <PlaylistCard name={"Rock music"} songs={200} followers={3000} />
          <PlaylistCard name={"Rock music"} songs={200} followers={3000} />
          <PlaylistCard name={"Rock music"} songs={200} followers={3000} />
          <PlaylistCard name={"Rock music"} songs={200} followers={3000} />
        </ScrollView>
      </View>
      <Text style={styles.title}>Songs</Text>
      <ScrollView
        scrollEventThrottle={16}
        snapToInterval={120}
        style={{ width: width }}
        overScrollMode={"never"}
      >
        {songs.map((data: any, index) => (
          <Pressable key={index} onPress={() => handleActiveSong(index)}>
            <MusicCard
              artist={data.artist}
              songName={data?.name}
              index={index}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const Title = () => {
  return (
    <Text
      style={{
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
      }}
    >
      Homee
    </Text>
  );
};

const Search = () => {
  return <Feather name="search" color="white" size={30} />;
};
