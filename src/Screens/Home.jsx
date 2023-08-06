import React from "react";
import { StyleSheet, Pressable, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CreatePostScreen from "./CreatePostScreen";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import logOutImg from "../../assets/images/log-out.png";
import { useDispatch } from "react-redux";
import { authSingOut } from "../../redux/auth/authOperations";

const Tab = createBottomTabNavigator();

export default Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const singOut = () => {
    dispatch(authSingOut());
    console.log("singOut")
    navigation.navigate("Login");
  };

  return (
    <Tab.Navigator
      initialRouteName="PostScreen"
      backBehavior="order"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName === "PostsScreen") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (routeName === "CreatePostScreen") {
            iconName = focused ? "add" : "add-outline";
          } else if (routeName === "ProfileScreen") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarItemStyle: {
          width: 70,
          height: 40,
          borderRadius: 20,
          marginLeft: "auto",
          marginRight: "auto",
        },
        tabBarStyle: {
          height: 83,
          paddingLeft: 10,
          paddingRight: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },

        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveTintColor: "#808080",
      })}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          headerStyle: {
            height: 100,
            backgroundColor: "#fff",
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: 0.41,
          },

          headerRight: () => (
            <Pressable onPress={singOut}>
              <Image source={logOutImg} style={styles.LogOutIcon} />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerStyle: {
            height: 100,
            backgroundColor: "#fff",
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: 0.41,
          },

          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate("PostsScreen")}
              style={styles.ArrowBack}
            >
              <Ionicons name="arrow-back" size={24} color={"#212121"} />
            </Pressable>
          ),
          tabBarStyle: {
            height: 0,
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  LogOutIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },

  ArrowBack: {
    paddingLeft: 16,
  },
});
