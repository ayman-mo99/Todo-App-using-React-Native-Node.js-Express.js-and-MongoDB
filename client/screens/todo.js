import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import AddTodo from "./addTodo";

export default function todo({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [load, setload] = useState(false);

  useEffect(() => {
    data();
  }, [todos]);

  useEffect(() => {
    setTodos(navigation.getParam("json").Todos);
  }, []);

  async function data() {
    try {
      let response = await fetch(
        "http://localhost:4000/api/user/todo/" +
          navigation.getParam("json")._id,
        {
          method: "PUT",
          body: JSON.stringify({ Todos: todos }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteuser() {
    try {
      let response = await fetch(
        "http://localhost:4000/api/user/delete/" +
          navigation.getParam("json")._id,
        {
          method: "DELETE",
          body: JSON.stringify({ Todos: todos }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  const pressHandler = (key) => {
    //--------------Delete todo
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (task) => {
    //----------------------------- add todo
    if (task.length > 3) {
      setTodos((prevTodos) => {
        return [
          { task, key: Math.random().toString(), complete: false },
          ...prevTodos,
        ];
      });
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };

  const MakeChange = (key, task) => {
    var temp = [...todos];
    for (var i = 0; i < todos.length; i++) {
      if (temp[i].key == key) {
        temp[i].task = task;
      }
    }
    setTodos(temp);
  };

  const IconPress = (key) => {
    var temp = [...todos];
    for (var i = 0; i < todos.length; i++) {
      if (temp[i].key == key) {
        temp[i].complete = !temp[i].complete;
      }
    }
    setTodos(temp);
  };
  if (load) {
    return (
      <View style={styles.containerr}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      /* <TouchableWithoutFeedback onPress={() => {
    Keyboard.dismiss();
    console.log('dismissed');
  }}>*/

      <View style={globalStyles.container2}>
        <View style={globalStyles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={globalStyles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <View style={globalStyles.item}>
                  <MaterialIcons
                    name="delete"
                    size={18}
                    color="#333"
                    onPress={() => pressHandler(item.key)}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("change", {
                        title: item.task,
                        ky: item.key,
                        MakeChange: MakeChange,
                      })
                    }
                  >
                    {item.complete && (
                      <Text style={globalStyles.test}>{item.task}</Text>
                    )}
                    {!item.complete && (
                      <Text style={globalStyles.itemText}>{item.task}</Text>
                    )}
                  </TouchableOpacity>
                  <CheckBox
                    style={{ padding: 0 }}
                    checked={item.complete}
                    onIconPress={() => IconPress(item.key)}
                  />
                </View>
              )}
            />
          </View>
          <View style={{ paddingTop: 10 }} />
          <Button
            title={"log out!"}
            onPress={() => {
              navigation.navigate("login");
            }}
          />
          <View style={{ paddingTop: 10 }} />
          <Button
            title={"Delete my account"}
            color="black"
            onPress={() => {
              deleteuser();
              navigation.pop();
            }}
          />
        </View>
      </View>
      //</TouchableWithoutFeedback>
    );
  }
}
