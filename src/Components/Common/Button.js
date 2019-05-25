// Libraries
import React, { PureComponent } from 'react';
import { Platform, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

// Utilities
import { Colors, Metrics } from '../../Themes';
import { CommonUtils } from '../../Utils';

// Components
import Icon from './Icon/Icon';

export default class Button extends PureComponent {

  render() {

    // console.tron.display({
    //   name: 'this.props',
    //   value: this.props,
    //   preview: 'when you click here, it might show this.props',
    //   important: true,
    //   // image: 'http://placekitten.com/g/400/400'
    // })

    // CommonUtils.log("Button render this.prop: ", this.props)

    const { onPress, label, isHideLabel, isHideIcon, buttonStyle, buttonIcon,
      labelWrapper, iconWrapper, iconType, name, titleText, labelText, iconColor, hitSlop,
      isLoading } = this.props;
    const labelView = isHideLabel ? null : <View style={[styles.labelWrapper, labelWrapper]}><Text style={[styles.labelText, labelText]}>{label}</Text></View>;
    const iconView = isHideIcon ? null : <View style={[styles.iconWrapper, iconWrapper]}><Icon iconType={iconType} name={name} color={iconColor} /></View>;

    if (isLoading) {
      return (
        <View style={[buttonStyle, styles.indicatorWrapper]}>
          <ActivityIndicator size="small" color={Colors.primaryColor} />
        </View>
      )
    }
    return (
      <TouchableOpacity onPress={() => onPress()}
        style={[styles.container, buttonStyle]} hitSlop={hitSlop}>
        {iconView}
        {labelView}
      </TouchableOpacity>
    )
  }
}

Button.defaultProps = {
  onPress: () => { },
  label: "",
  isHideIcon: false,
  isHideLabel: false,
  iconType: null,
  color: Colors.white,
  labelWrapper: {},
  iconWrapper: {},
  buttonStyle: {}
};

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  isHideIcon: PropTypes.bool,
  isHideLabel: PropTypes.bool,
  iconType: PropTypes.string,
  color: PropTypes.string,
  buttonStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
  labelWrapper: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
  iconWrapper: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
}


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 3,
  },
  indicatorWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  labelWrapper: {
    flex: 2,
  },
  labelText: {
    color: Colors.white,
    fontSize: 20
  },
  iconWrapper: {
    flex: 1,
  }
});