import React, { useState } from "react";
import {
  View,
  Alert,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import { NavigationActions } from "react-navigation";

export default function Home({ navigation }) {
  const [mail, setmail] = useState("");
  const [pass, setpass] = useState("");
  async function login() {
    if ((mail !== "") & (pass !== "")) {
      try {
        let response = await fetch("http://localhost:4000/api/user/login", {
          method: "POST",
          body: JSON.stringify({ email: mail, password: pass }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let json = await response.json();
        if (response.ok) {
          navigation.navigate("todo", { json: json });
          setmail("");
          setpass("");
        } else {
          console.log(json.message);
          Alert.alert(json.message);
        }
      } catch (error) {
        console.log(error.message);
        Alert.alert(error.message);
      }
    } else {
      Alert.alert("YOU didnot write the email or the passpwrd");
    }
  }

  return (
    //    <TouchableWithoutFeedback onPress={()=> {console.log("hi"); Keyboard.dismiss()}}>
    <View style={globalStyles.modalContainer}>
      <View style={{ paddingTop: 10 }} />
      <TextInput
        style={{ width: 200, height: 40, borderWidth: 1 }}
        value={mail}
        keyboardType="email-address"
        placeholder="email"
        autoCapitalize="none"
        onChangeText={(text) => {
          setmail(text);
        }}
      />
      <View style={{ paddingTop: 10 }} />

      <TextInput
        style={{ width: 200, height: 40, borderWidth: 1 }}
        value={pass}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setpass(text);
        }}
      />

      <View style={{ paddingTop: 10 }} />
      <Button title={"login"} onPress={login} />

      <View style={{ paddingTop: 50 }} />
      <Button
        title={"signup"}
        color="red"
        onPress={() => {
          navigation.navigate("signup");
          setmail("");
          setpass("");
        }}
      />
    </View>
    //  </TouchableWithoutFeedback>
  );
}
