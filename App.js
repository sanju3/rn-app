import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import UserScreen from "./screens/UserScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { Provider } from "react-redux";
import configureStore from "./store";

const Stack = createStackNavigator();
const store = configureStore();

class App extends React.Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator headerMode={"none"} initialRouteName="Login">
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="User" component={UserScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
export default App;
