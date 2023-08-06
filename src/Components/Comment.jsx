import { Text, View, Image, StyleSheet } from "react-native";
import ellipseImg from "../../assets/images/Ellipse.png";

export const Comment = ({ comments }) => {
  const { author, text, date } = comments;
  return (
    <View style={styles.MainWrap}>
      <View style={styles.CommentWrap}>
        <Text style={styles.Text}>{text}</Text>
        <Text style={styles.Date}>{date}</Text>
      </View>
      <Image
        style={styles.Avatar}
        source={
          author === "Natali Romanova"
            ? require("../../assets/images/UserLogo.jpg")
            : ellipseImg
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 24,
  },
  CommentWrap: {
    width: 299,
    padding: 16,
    backgroundColor: "#00000009",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 0,
  },
  Text: {
    fontFamily: "Roboto",
    fontSize: 13,
    color: "#212121",
    marginBottom: 8,
  },
  Date: {
    fontFamily: "Roboto",
    fontSize: 10,
    color: "#BDBDBD",
    alignSelf: "flex-end",
  },
  Avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
