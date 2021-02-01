import React from "react";
import { Image } from "react-native";

class CustomImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      styles: props.styles,
    };
  }
  render() {
    return (
      <Image
        resizeMode="contain"
        style={this.state.styles}
        source={this.state.url}
      />
    );
  }
}

export default CustomImage;
