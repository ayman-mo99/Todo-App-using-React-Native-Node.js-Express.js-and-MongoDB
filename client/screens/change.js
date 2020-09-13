import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function Home({ navigation }) {
  const [chng, setchng] = useState(navigation.getParam("title"));
  var f_change = navigation.getParam("MakeChange");
  var key = navigation.getParam("ky");

  return (
    //  <TouchableWithoutFeedback onPress={()=> {console.log("hi"); Keyboard.dismiss()}}>
    <View style={globalStyles.modalContainer}>
      <View style={{ paddingTop: 10 }} />
      <TextInput
        style={{ width: 200, height: 40, borderWidth: 1 }}
        value={chng}
        onChangeText={(text) => {
          setchng(text);
        }}
      />
      <View style={{ paddingTop: 10 }} />
      <Button
        title={"save changes"}
        color="green"
        onPress={() => f_change(key, chng)}
      />
      <View style={{ paddingTop: 50 }} />
      <Button title={"Back"} onPress={() => navigation.pop()} />
    </View>
    //</TouchableWithoutFeedback>
  );
}
