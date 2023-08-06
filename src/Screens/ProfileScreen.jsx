import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import bgImg from "../../assets/images/bg.jpg";
import addImg from "../../assets/images/del.png";
import { posts } from "../Data/postsData";
import Post from "../Components/Post";

export default ProfileScreen = () => {
  return (
    <View style={styles.MainWrap}>
      <Image source={bgImg} resizeMode="cover" style={styles.bg} />
      <View style={styles.ProfileWrap}>
        <View style={styles.UserImgWrap}>
          <Image source={addImg} style={styles.AddIcon} />
        </View>
        <Text style={styles.Title}>Natali Romanova</Text>
        <View style={styles.ListWrap}>
          <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainWrap: {
    position: "relative",
    flex: 1,
  },

  bg: {
    position: "absolute",
    width: "100%",
  },
  ProfileWrap: {
    position: "relative",
    width: "100%",
    height: "100%",
    marginTop: 147,
    paddingTop: 92,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  UserImgWrap: {
    position: "absolute",
    width: 120,
    height: 120,
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
  },
  AddIcon: {
    position: "absolute",
    top: 81,
    left: 107.5,
    transform: [{ translateX: -8 }],
  },
  Title: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 33,
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35.16,
    letterSpacing: 1.01,
  },
  ListWrap: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});
