import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import CustomImage from "../components/image";
import { REGISTERIMAGE } from "../assets";
import ErrorMessage from "../components/errorMessage";
import TextBox from "../components/textBox";
import { Entypo } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import RadioForm from "react-native-simple-radio-button";
import { mailformat } from "../constants";
import { signUp } from "../services";
import { register } from "../actions/userActions";
import { connect } from "react-redux";

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      passwordVisibility: false,
      passwordConfirm: "",
      country: "Canada",
      acknoledge: false,
      signCheck: false,
      error: {
        status: false,
        message: "",
      },
    };
    this.countries = [
      { label: "Canada", value: "Canada" },
      { label: "USA", value: "USA" },
      { label: "Europe", value: "Europe" },
      { label: "Other", value: "Other" },
    ];
  }

  handleChangeFullName = (text) => {
    this.setState({
      fullName: text,
      error: {
        status: false,
        message: "",
      },
    });
  };

  handleChangeEmail = (text) => {
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

  handleChangeConfirmPassword = (text) => {
    this.setState({
      passwordConfirm: text,
      error: {
        status: false,
        message: "",
      },
    });
  };

  signUpHandler = async () => {
    if (!(this.state.fullName || this.state.email || this.state.password)) {
      this.setState({
        error: {
          status: true,
          message: "Fill all the fields!",
        },
      });
    } else if (this.state.password.length <= 7) {
      this.setState({
        error: {
          status: true,
          message: "Weak password, try morethan 8 characters.",
        },
      });
    } else if (!this.state.email.match(mailformat)) {
      this.setState({
        error: {
          status: true,
          message: "Please enter a valid email address.",
        },
      });
    } else if (!this.state.acknoledge) {
      this.setState({
        error: {
          status: true,
          message: "Please accept the license agreement.",
        },
      });
    } else if (this.state.passwordVisibility) {
      if (this.state.password !== this.state.passwordConfirm) {
        this.setState({
          error: {
            status: true,
            message: "Error! Looks like passwords don't match up.",
          },
        });
      } else {
        this.props.registerUser(
          this.state.email,
          this.state.fullName,
          this.state.password
        );
      }
    } else {
      this.props.registerUser(
        this.state.email,
        this.state.fullName,
        this.state.password
      );
    }
  };

  componentDidUpdate() {
    if (this.props.data) {
      this.props.navigation.navigate("User", {
        user: { username: this.state.email },
      });
    }
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: 700 }}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <CustomImage styles={styles.image} url={REGISTERIMAGE} />
          </View>
          <View style={styles.root}>
            <View style={styles.main}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                Sign Up{" "}
                <Text style={{ fontWeight: "normal" }}>for an account</Text>
              </Text>
              <View style={styles.textField}>
                <TextBox
                  textTitle="Full Name "
                  secure={false}
                  textValue={this.state.fullName}
                  changeValue={this.handleChangeFullName}
                />
              </View>
              <View style={styles.textField}>
                <TextBox
                  textTitle="Email Address "
                  secure={false}
                  textValue={this.state.email}
                  changeValue={this.handleChangeEmail}
                />
              </View>

              <View style={styles.password}>
                <View style={styles.textField}>
                  <TextBox
                    textTitle="Password (8+Characters) "
                    secure={this.state.passwordVisibility}
                    textValue={this.state.password}
                    changeValue={this.handleChangePassword}
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
              {this.state.passwordVisibility ? (
                <View style={styles.textField}>
                  <TextBox
                    textTitle="Confirm Password "
                    secure={true}
                    textValue={this.state.passwordConfirm}
                    changeValue={this.handleChangeConfirmPassword}
                  />
                </View>
              ) : null}
            </View>
          </View>
          <View style={styles.root}>
            {this.state.error.status ? (
              <View style={styles.errorMessages}>
                <ErrorMessage errorMsg={this.state.error.message} />
              </View>
            ) : null}

            {this.props.error ? (
              <View style={styles.errorMessages}>
                <ErrorMessage errorMsg={this.props.error} />
              </View>
            ) : null}
          </View>
          <View style={styles.root}>
            <View style={styles.userAgreementContent}>
              <CheckBox
                disabled={false}
                value={this.state.acknoledge}
                onValueChange={(value) =>
                  this.setState({
                    acknoledge: value,
                    error: { status: false, message: "" },
                  })
                }
              />
              <View>
                <Text style={{ marginLeft: 5 }}>
                  I accept and acknoledge the
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: "orange",
                      fontWeight: "bold",
                    }}
                  >
                    Uer License Agreement{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.root}>
            <View style={styles.userAgreementContent}>
              <CheckBox
                disabled={false}
                value={this.state.signCheck}
                onValueChange={(value) => this.setState({ signCheck: value })}
              />
              <View>
                <Text style={{ marginLeft: 5 }}>Stay signed-in</Text>
              </View>
            </View>
          </View>
          <View style={styles.root}>
            <View style={styles.bottomSection}>
              <Text style={{ marginBottom: 15 }}>
                Choose country of residence
              </Text>
              <RadioForm
                radio_props={this.countries}
                initial={0}
                formHorizontal={true}
                buttonColor={"grey"}
                buttonSize={10}
                selectedButtonColor={"orange"}
                animation={true}
                onPress={(value) => this.setState({ country: value })}
                labelStyle={{ marginRight: 10 }}
              />
              {this.props.loading ? (
                <TouchableOpacity>
                  <Text style={styles.signButton}>
                    <ActivityIndicator size="small" color="orange" />
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.signUpHandler();
                  }}
                >
                  <Text style={styles.signButton}>Sign Up</Text>
                </TouchableOpacity>
              )}

              <View
                style={{
                  marginBottom: 20,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Your privacy is our priority.{" "}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "orange",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Learn How
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.register.loading,
    data: state.register.data,
    error: state.register.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: async (username, fullname, password) =>
      await dispatch(register(username, fullname, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  root: {
    marginHorizontal: 30,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "15%",
  },
  errorMessages: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  main: {
    alignItems: "center",
  },
  textField: {
    marginBottom: 10,
    marginTop: 10,
    width: "80%",
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
  userAgreementContent: {
    flexDirection: "row",
    marginHorizontal: "10%",
    justifyContent: "flex-start",
    marginTop: 0,
  },
  bottomSection: {
    alignItems: "center",
  },
  countryList: {
    marginEnd: 20,
  },
  signButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0AB4B4",
    paddingHorizontal: 50,
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    borderRadius: 7,
    marginVertical: 15,
  },
});
