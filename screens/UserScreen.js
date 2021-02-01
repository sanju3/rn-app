import React from "react";
import { Text, View, StyleSheet } from "react-native";

class UserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>User Page</Text>
        <Text>Welcome {this.props.route.params.user.username}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
export default UserScreen;
