import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { globalStyles } from "../styles/global";
export default function AddTodo({ submitHandler }) {
  const [text, setText] = useState("");

  const changeHandler = (val) => {
    setText(val);
  };

  const pressHandler = () => {
    submitHandler(text);
    setText("");
  };

  return (
    <View>
      <TextInput
        style={globalStyles.input}
        placeholder="new todo..."
        onChangeText={changeHandler}
        value={text}
      />
      <Button onPress={pressHandler} title="add todo" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
