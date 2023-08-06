import validator from "validator";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { authLog } from "../../redux/auth/authOperations";
import { useAuth } from "../../redux/auth/useAuth";

import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from "react-native";

export default LogScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isError } = useAuth();

  const [focusColorMail, setFocusColorMail] = useState("#e8e8e8");
  const [focusColorPass, setFocusColorPass] = useState("#e8e8e8");
  const [showPass, setShowPass] = useState(true);

  const [email, onChangeEmail] = useState("");
  const [password, onChangePass] = useState("");

  const onFocusMail = () => {
    setFocusColorMail("#FF6C00");
    setFocusColorPass("#e8e8e8");
  };

  const onFocusPass = () => {
    setFocusColorMail("#e8e8e8");
    setFocusColorPass("#FF6C00");
  };

  const changeShowPass = () => {
    setShowPass(!showPass);
  };

  const onBtnLogPress = () => {
    const validEmail = validator.isEmail(email);

    if (!email || !password) {
      Alert.alert("All inputs must be filled");
      return;
    }
    if (!validEmail) {
      Alert.alert("Email not valid");
      return;
    }
    const data = {
      email,
      password,
    };

    dispatch(authLog({ email, password }));

    if (isError) {
      console.log(isError);
      Alert.alert("Check email or password");
      return;
    }

    navigation.navigate("Home");
    onChangeEmail("");
    onChangePass("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.Wrap}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-220}
        >
          <View style={styles.LogWrap}>
            <Text style={styles.Title}>Увійти</Text>
            <View style={styles.InputWrap}>
              <TextInput
                type="email"
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={onChangeEmail}
                keyboardType="email-address"
                placeholderTextColor={"#BDBDBD"}
                selectionColor="#212121"
                onFocus={() => onFocusMail()}
                style={[{ borderColor: focusColorMail }, styles.Input]}
              ></TextInput>
              <View>
                <TextInput
                  type="password"
                  placeholder="Пароль"
                  maxLength={37}
                  value={password}
                  onChangeText={onChangePass}
                  secureTextEntry={showPass}
                  placeholderTextColor={"#BDBDBD"}
                  selectionColor="#212121"
                  onFocus={() => onFocusPass()}
                  style={[{ borderColor: focusColorPass }, styles.Input]}
                ></TextInput>

                <Pressable
                  onPress={() => changeShowPass()}
                  style={styles.ShowPas}
                  hitSlop={{ left: 32, bottom: 16, top: 16, right: 16 }}
                >
                  {password.length > 0 &&
                    (showPass ? (
                      <Text style={styles.ShowPassText}>Показати</Text>
                    ) : (
                      <Text style={styles.ShowPassText}>Сховати</Text>
                    ))}
                </Pressable>
              </View>
            </View>

            <TouchableHighlight style={styles.LogBtn} onPress={onBtnLogPress}>
              <Text style={styles.BtnTitle}>Увійти</Text>
            </TouchableHighlight>
            <View style={styles.RegOffer}>
              <Text style={styles.QuestionText}>Немає акаунту? </Text>
              <Text
                style={styles.BtnRegText}
                onPress={() => navigation.navigate("Registration")}
              >
                Зареєструватися
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  Wrap: {
    marginTop: 343,
    flex: 1,
    justifyContent: "flex-end",
  },
  LogWrap: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingTop: 32,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  InputWrap: {
    marginBottom: 43,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 16,
    alignItems: "center",
  },
  Input: {
    width: 343,
    height: 50,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
    borderWidth: 1,
  },
  LogBtn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  BtnTitle: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 18.75,
    color: "#fff",
  },
  RegOffer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  BtnRegText: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 18.75,
    color: "#1B4371",
    textDecorationLine: "underline",
  },
  QuestionText: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 18.75,
    color: "#1B4371",
  },
  ShowPas: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  ShowPassText: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 18.75,
    color: "#1B4371",
  },
});
