import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import MusicPlayerScreen from "../screens/MusicPlayer/MusicPlayerScreen";
import ProfileScreen from "../screens/Profile";
import Svg, {
  Path,
  Stop,
  Defs,
  LinearGradient,
  Circle,
} from "react-native-svg";
import useMusicStore from "../state/MusicStore";
const BottomTab = createBottomTabNavigator();
const BACKGROUND = "rgba(19,19,20,0.1)";
const Navigation = () => {
  const isPlaying = useMusicStore((state) => state.isPlaying);

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: BACKGROUND,
            borderTopWidth: 0,
            position: "absolute",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            left: 0,
            right: 0,
            bottom: 0,
            elevation: 0,
          },
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Svg
                  width={`${focused ? 40 : 30}`}
                  height={`${focused ? 40 : 30}`}
                  viewBox="0 0 24 24"
                  stroke={`${focused ? BACKGROUND : "#fff"}`}
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Defs>
                    <LinearGradient
                      id={"gradient"}
                      x1={"0%"}
                      x2={"100%"}
                      y1={0}
                      y2={0}
                    >
                      <Stop
                        offset={"0%"}
                        stopOpacity={1}
                        stopColor="#ff8f4f"
                      ></Stop>
                      <Stop
                        offset={"100%"}
                        stopOpacity={1}
                        stopColor="#ee53d3"
                      ></Stop>
                    </LinearGradient>
                  </Defs>

                  <Path
                    d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-7a.5.5 0 00-.146-.354L13 5.793V2.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1.293L8.354 1.146a.5.5 0 00-.708 0l-6 6A.5.5 0 001.5 7.5v7a.5.5 0 00.5.5h4a.5.5 0 00.5-.5z"
                    fill={`${focused ? "url(#gradient)" : "none"}`}
                  />
                </Svg>
              );
            },
          }}
        />
        <BottomTab.Screen
          name="MusicPlayer"
          component={MusicPlayerScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Svg
                  width={`${focused ? 35 : 28}`}
                  height={`${focused ? 35 : 28}`}
                  style={{ marginTop: -10 }}
                  viewBox="0 0 24 24"
                  stroke={`${focused ? BACKGROUND : "#fff"}`}
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Defs>
                    <LinearGradient
                      id={"gradient"}
                      x1={"0%"}
                      x2={"100%"}
                      y1={0}
                      y2={0}
                    >
                      <Stop
                        offset={"0%"}
                        stopOpacity={1}
                        stopColor="#ff8f4f"
                      ></Stop>
                      <Stop
                        offset={"100%"}
                        stopOpacity={1}
                        stopColor="#ee53d3"
                      ></Stop>
                    </LinearGradient>
                  </Defs>
                  <Circle
                    cx={12}
                    cy={12}
                    r={10}
                    fill={`${focused ? "url(#gradient)" : "none"}`}
                  />
                  {isPlaying ? (
                    <>
                      <Path
                        d="M10 15L10 9"
                        stroke={`${focused ? "rgb(19,19,20)" : "#fff"}`}
                      />
                      <Path
                        d="M14 15L14 9"
                        stroke={`${focused ? "rgb(19,19,20)" : "#fff"}`}
                      />
                    </>
                  ) : (
                    <Path
                      d="M10 8L16 12 10 16 10 8z"
                      fill={`${focused ? "rgb(19,19,20)" : "none"}`}
                    />
                  )}
                </Svg>
              );
            },
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Svg
                  width={`${focused ? 35 : 28}`}
                  height={`${focused ? 35 : 28}`}
                  style={{ marginTop: focused ? -20 : -10 }}
                  viewBox="0 0 24 24"
                  stroke={`${focused ? BACKGROUND : "#fff"}`}
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Defs>
                    <LinearGradient
                      id={"gradient"}
                      x1={"0%"}
                      x2={"100%"}
                      y1={0}
                      y2={0}
                    >
                      <Stop
                        offset={"0%"}
                        stopOpacity={1}
                        stopColor="#ff8f4f"
                      ></Stop>
                      <Stop
                        offset={"100%"}
                        stopOpacity={1}
                        stopColor="#ee53d3"
                      ></Stop>
                    </LinearGradient>
                  </Defs>
                  <Path
                    d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                    fill={`${focused ? "url(#gradient)" : "none"}`}
                  />
                  <Circle
                    cx={12}
                    cy={focused ? 10.5 : 8.5}
                    r={4}
                    fill={`${focused ? "url(#gradient)" : "none"}`}
                  />
                </Svg>
              );
            },
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
