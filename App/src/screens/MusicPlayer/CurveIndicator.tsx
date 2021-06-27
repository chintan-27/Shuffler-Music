import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Cursor, { CURSOR_SIZE } from "./Cursor";
import Svg, {
  Path,
  Mask,
  LinearGradient,
  Stop,
  Rect,
  Defs,
} from "react-native-svg";
import useMusicStore from "../../state/MusicStore";
import { getYForX, parse } from "./Path";

const { width } = Dimensions.get("window");

export const INDICATOR_HEIGHT = 1;
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
});
const CurveIndicator = () => {
  const [activeDuration, duration, setDuration] = useMusicStore((state) => [
    state.activeDuration,
    state.duration,
    state.handleDuration,
  ]);
  const isGestureActive = useSharedValue(false);
  const scale = useSharedValue(1);

  const iwidth = useSharedValue(0);
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
  const d = [
    "M0 50",
    `C ${width / 5} 30 ${width / 4} 30 ${width / 2} 50`,
    `C ${width / 1.5} 60 ${width / 1.2} 80 ${width} 50`,
    ,
  ].join(" ");
  const path = parse(d);
  const cursorStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: -CURSOR_SIZE,
      left: Math.max(0, Math.min(iwidth.value, width - CURSOR_SIZE * 2)),
      transform: [
        { translateY: getYForX(path, iwidth.value)! },
        { scale: scale.value },
      ],
    };
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      width: iwidth.value,
    };
  });
  return (
    <Animated.View style={styles.container}>
      <Svg fill="none">
        <Defs>
          <LinearGradient id={"gradient"} x1={"0%"} x2={"100%"} y1={0} y2={0}>
            <Stop offset={0} stopOpacity={1} stopColor="#ee53d3"></Stop>
            <Stop offset={width} stopOpacity={1} stopColor="#ff8f4f"></Stop>
          </LinearGradient>
          <Mask id="mask">
            {/* <Path d={d} stroke="#fff" strokeWidth={INDICATOR_HEIGHT} />
             */}
            <AnimatedRect
              animatedProps={animatedProps}
              height={100}
              fill="url(#gradient)"
            />
          </Mask>
        </Defs>
        <Path d={d} stroke="#888" strokeWidth={INDICATOR_HEIGHT} />
        <Path
          d={d}
          stroke="url(#gradient)"
          strokeWidth={INDICATOR_HEIGHT}
          mask="url(#mask)"
        />
      </Svg>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[cursorStyle]}>
          <Cursor />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default CurveIndicator;
