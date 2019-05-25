// Libraries
import React, { PureComponent, Component } from "react";
import { TextInput } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import PropTypes from "prop-types";

// Utilities
import { Colors, Metrics } from "../../Themes";
import { CommonUtils } from "../../Utils";

// Components
import Icon from "./Icon";

export default class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  render() {
    return (
      <TextInput
        {...this.props}
        onChangeText={this.onChangeText}
        value={this.state.value}
      />
    );
  }

  onChangeText = value => {
    console.log('onChangeText value: ', value)
    this.setState({ value });
    this.props.getValue(value)
  };

//   getValue = () => {this.props.getValue(this.state.value)}
}

InputText.defaultProps = {
  onPress: () => {},
  value: ""
};

InputText.propTypes = {
  onPress: PropTypes.func,
  value: PropTypes.string
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 3
  },
  labelWrapper: {
    flex: 2
  },
  labelText: {
    color: Colors.white,
    fontSize: 20
  },
  iconWrapper: {
    flex: 1
  }
});
