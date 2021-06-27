import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Cursor, { CURSOR_SIZE } from "./Cursor";
import { useState } from "react";
import useMusicStore from "../../state/MusicStore";

const { width } = Dimensions.get("window");

export const INDICATOR_HEIGHT = 1;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const styles = StyleSheet.create({
  container: {
    height: 1,
    width: width,
    backgroundColor: "#888",
  },
});

const Indicator = () => {
  const [activeDuration, duration, setDuration] = useMusicStore((state) => [
    state.activeDuration,
    state.duration,
    state.handleDuration,
  ]);
  const isGestureActive = useSharedValue(false);
  const scale = useSharedValue(1);
  const iwidth = useSharedValue((activeDuration / duration) * width);
  const [isfirstMount, setFirstMount] = useState(false);

  useEffect(() => {
    if (!isfirstMount) return setFirstMount(true);
    if (!isGestureActive.value) {
      iwidth.value = withTiming((activeDuration / duration) * width, {
        duration: 300,
      });
    }
    // y.value = getYForX(path, iwidth.value)
  }, [activeDuration]);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isGestureActive.value = true;
      scale.value = withTiming(1.3);
    },
    onActive: ({ absoluteX }) => {
      iwidth.value = Math.max(0, Math.min(absoluteX, width - CURSOR_SIZE * 2));
    },
    onEnd: () => {
      runOnJS(setDuration)((iwidth.value / width) * duration);
      isGestureActive.value = false;
      scale.value = withTiming(1);
    },
  });
  const style = useAnimatedStyle(() => ({
    width: iwidth.value,
    height: INDICATOR_HEIGHT,
  }));
  const cursorStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: -CURSOR_SIZE,
    left: Math.max(0, Math.min(iwidth.value, width - CURSOR_SIZE * 2)),
    transform: [{ scale: scale.value }],
  }));
  return (
    <View style={styles.container}>
      <AnimatedLinearGradient
        style={[style]}
        start={{ x: 1, y: 1 }}
        colors={["#ee53d3", "#ff8f4f"]}
      />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[cursorStyle]}>
          <Cursor />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Indicator;
