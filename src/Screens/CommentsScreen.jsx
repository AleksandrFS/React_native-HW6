import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Comment } from "../Components/Comment";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getUser } from "../../redux/auth/authSelectors";
import { useDispatch, useSelector } from "react-redux";
import { uuidv4 } from "@firebase/util";
import { addComment } from "../../redux/posts/postsSlice";
import { getComments } from "../../redux/posts/postsOperations";
import { format } from "date-fns";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";

export default CommentsScreen = () => {
  const {
    params: { comments, postId, img, title },
  } = useRoute();

  const [comment, setComment] = useState(null);
  const [newComment, setNewComments] = useState(comments);
  const dispatch = useDispatch();

  const { login } = useSelector(getUser);

  const hadleCommentAdd = () => {
    const newComment = {
      author: login,
      date: format(new Date(), "dd MMMM, yyyy | kk:mm"),
      id: uuidv4(),
      text: comment,
    };

    console.log(newComment);

    dispatch(addComment({ postId, newComment }));

    getComments(postId, setNewComments);
    setComment(null);
  };

  return (
    <View style={styles.MainWrap}>
      <View style={styles.PhotoWrap}>
        <Image source={img} alt={title} style={styles.Photo} />
      </View>
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comments={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.InputWrap}>
          <TextInput
            onChangeText={setComment}
            style={styles.Input}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            multiline
          />
          <Pressable onPress={hadleCommentAdd} style={styles.addCommentBtn}>
            <Ionicons name="arrow-up-outline" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  MainWrap: {
    width: "100%",
    height: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  PhotoWrap: {
    width: "100%",
    height: 240,
    marginTop: 32,
    marginBottom: 32,
    backgroundColor: "black",
    borderRadius: 8,
    overflow: "hidden",
  },
  Photo: {
    width: "100%",
    height: "100%",
    marginBottom: 32,
  },
  InputWrap: {
    width: "100%",
    minHeight: 50,
    marginTop: 15,
    marginBottom: 24,
    paddingLeft: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
  },
  Input: {
    width: "75%",
  },
  addCommentBtn: {
    width: 34,
    height: 34,
    marginRight: 8,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
