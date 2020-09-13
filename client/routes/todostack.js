import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import login from "../screens/login";
import signup from "../screens/signup";
import todo from "../screens/todo";
import change from "../screens/change";

const screens = {
  login: {
    screen: login,
    navigationOptions: {
      title: "login",
    },
  },
  signup: {
    screen: signup,
    navigationOptions: {
      title: "signup",
    },
  },

  todo: {
    screen: todo,
    navigationOptions: {
      title: "TodoList",
    },
  },
  change: {
    screen: change,
    navigationOptions: {
      title: "change",
    },
  },
};

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#FFA500", height: 60 },
    headerLeft: null,
  },
});

export default createAppContainer(AboutStack);
