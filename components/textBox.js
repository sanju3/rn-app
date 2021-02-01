import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

class TextBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textField}>
          <Text style={styles.upText}>
            {this.props.textTitle} <Text style={{ color: "red" }}>*</Text>{" "}
          </Text>

          <TextInput
            secureTextEntry={this.props.secure}
            value={this.props.textValue}
            onChangeText={(text) => this.props.changeValue(text)}
          />
        </View>
        {this.props.secure ? (
          <View style={styles.clearButton}>
            <TouchableOpacity onPress={() => this.props.changeValue("")}>
              <AntDesign name="closecircle" size={15} color="grey" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

export default TextBox;

const styles = StyleSheet.create({
  container: {
    borderColor: "grey",
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  textField: {
    width: "90%",
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    marginLeft: 5,
  },
  upText: {
    color: "grey",
    fontSize: 10,
    fontWeight: "bold",
  },
});
