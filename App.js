import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import UserScreen from "./screens/UserScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();

class App extends React.Component {
  state = {};
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={"none"} initialRouteName="Login">
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="User" component={UserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
export default App;
