import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function ReviewDetails({ navigation }) {
  const [mail, setmail] = useState("");
  const [pass, setpass] = useState("");
  const [pass2, setpass2] = useState("");

  async function signup() {
    if (pass !== pass2) {
      console.log("no");
      Alert.alert("the two password are not th same");
      return;
    }
    if ((pass !== "") & (mail !== "")) {
      try {
        let response = await fetch("http://localhost:4000/api/user/register", {
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
          setpass2("");
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
    //<TouchableWithoutFeedback onPress={()=> {console.log("hi"); Keyboard.dismiss()}}>
    <View style={globalStyles.modalContainer}>
      <View style={{ paddingTop: 10 }} />
      <TextInput
        style={{ width: 200, height: 40, borderWidth: 1 }}
        value={mail}
        placeholder="email"
        keyboardType="email-address"
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

      <TextInput
        style={{ width: 200, height: 40, borderWidth: 1 }}
        value={pass2}
        placeholder="confirmpassword"
        secureTextEntry={true}
        onChangeText={(text) => {
          setpass2(text);
        }}
      />

      <View style={{ paddingTop: 10 }} />

      <Button title={"signup"} onPress={signup} />
      <View style={{ paddingTop: 50 }} />
      <Button title={"login"} color="red" onPress={() => navigation.pop()} />
    </View>
    //</TouchableWithoutFeedback>
  );
}
