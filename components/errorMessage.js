import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "red",
    marginLeft: 5,
  },
});

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: props.errorMsg,
    };
  }

  render() {
    return (
      <View style={styles.main}>
        <AntDesign name="exclamationcircleo" size={15} color="red" />
        <Text style={styles.text}>{this.state.errorMsg}</Text>
      </View>
    );
  }
}

export default ErrorMessage;
