import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import ErrorMessage from "../components/errorMessage";
import CustomImage from "../components/image";
import { LOGINIMAGE } from "../assets";
import { mailformat } from "../constants";
import TextBox from "../components/textBox";
import { signIn } from "../services";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      signCheck: false,
      passwordVisibility: true,
      error: {
        status: false,
        message: "",
      },
    };
  }

  handleChangeText = (text) => {
    this.setState({
      email: text,
      error: {
        status: false,
        message: "",
      },
    });
  };

  handleChangePassword = (text) => {
    this.setState({
      password: text,
      error: {
        status: false,
        message: "",
      },
    });
  };

  loginHandler = async () => {
    if (!this.state.email.match(mailformat)) {
      this.setState({
        error: {
          status: true,
          message: "Incorrect Email Address",
        },
      });
    } else if (!this.state.password) {
      this.setState({
        error: {
          status: true,
          message: "Enter a password!",
        },
      });
    } else {
      try {
        const status = await signIn(this.state.email, this.state.password);
        this.props.navigation.navigate("User", { user: status.data.user });
      } catch (error) {
        this.setState({
          error: {
            status: true,
            message: "Invalid credentials!",
          },
        });
      }
    }
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          height: 600,
        }}
      >
        <View style={styles.root}>
          <View style={styles.imageContainer}>
            <CustomImage styles={styles.image} url={LOGINIMAGE} />
          </View>

          {this.state.error.status ? (
            <View style={styles.errorMessages}>
              <ErrorMessage errorMsg={this.state.error.message} />
            </View>
          ) : null}

          <View style={styles.container}>
            <Text>
              Have an account?{" "}
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Login</Text>
            </Text>
            <View style={styles.textField}>
              <TextBox
                textTitle="Email Address"
                secure={false}
                textValue={this.state.email}
                changeValue={this.handleChangeText}
              />
            </View>
            <View style={styles.password}>
              <View style={styles.textField}>
                <TextBox
                  textTitle="Password"
                  secure={this.state.passwordVisibility}
                  textValue={this.state.password}
                  changeValue={this.handleChangePassword.bind(this)}
                />
              </View>

              <View style={styles.eye}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      passwordVisibility: !this.state.passwordVisibility,
                    })
                  }
                >
                  {this.state.passwordVisibility ? (
                    <Entypo name={"eye-with-line"} size={20} color="grey" />
                  ) : (
                    <Entypo name={"eye"} size={20} color="grey" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CheckBox
                disabled={false}
                value={this.state.signCheck}
                onValueChange={(value) => this.setState({ signCheck: value })}
              />
              <Text style={{ marginLeft: 5 }}>Stay signed-in</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.loginHandler();
              }}
            >
              <Text style={styles.loginButton}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{ marginTop: 10, color: "orange", fontWeight: "bold" }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text>Join for Free?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Register")}
              >
                <Text
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    margin: 30,
    marginTop: 10,
  },
  textField: {
    marginBottom: 10,
    marginTop: 10,
    width: "80%",
  },
  upText: {
    color: "grey",
    fontSize: 10,
    fontWeight: "bold",
  },
  password: {
    flexDirection: "row",
    width: "100%",
    marginLeft: "20%",
  },
  eye: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0AB4B4",
    paddingHorizontal: 50,
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    borderRadius: 7,
    marginTop: 20,
  },
  imageContainer: {
    marginTop: 30,
    width: "70%",
    height: "30%",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  errorMessages: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
