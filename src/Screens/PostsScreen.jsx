import UserLogo from "../../assets/images/UserLogo.jpg";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Post from "../Components/Post";
import { posts } from "../Data/postsData";
import { getUser } from "../../redux/auth/authSelectors";



export default PostsScreen = () => {
  const { login, email } = useSelector(getUser);

  return (
    <View style={styles.MainWrap}>
      <View style={styles.UserWrap}>
        <View style={styles.UserImgCont}>
          <Image source={UserLogo}></Image>
        </View>
        <View>
          <Text style={styles.Name}>{login}</Text>
          <Text style={styles.Email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainWrap: {
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
  },
  UserWrap: {
    marginTop: 32,
    marginBottom: 32,
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  UserImgCont: {
    width: 60,
    height: 60,
  },
  UserImg: {
    maxWidth: "100%",
    objectFit: "cover",
  },
});
