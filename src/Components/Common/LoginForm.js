// Libraries
import React, { PureComponent, Component } from "react";
import { TextInput, View } from "react-native";
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
      userName: '',
      passWord: ''
    };
  }
  render() {
    return (
      <View style={{width: 500, height: 500, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
        //   {...this.props}
          style={{width: 300, height: 50, backgroundColor: '#FEEF'}}
          onChangeText={this.onChangeUserName}
          value={this.state.userName}
          placeholder={'UserName'}
        />
        <TextInput
        //   {...this.props}
          style={{width: 300, height: 50, backgroundColor: '#FEEF'}}
          onChangeText={this.onChangePassword}
          value={this.state.passWord}
          placeholder={'passWord'}
        />
      </View>
    );
  }

  onChangeUserName = userName => {
    console.log("onChangeText userName: ", userName);
    this.setState({ userName });
    const {passWord} = this.state
    const data = {userName, passWord}
    this.props.getValue(data);
  };

  onChangePassword = passWord => {
    console.log("onChangeText passWord: ", passWord);
    this.setState({ passWord });
    const {userName} = this.state
    const data = {userName, passWord}
    this.props.getValue(data);
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
