// Libraries
import React, { PureComponent, Component } from "react";
import { TextInput, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import PropTypes from "prop-types";
import Button from '../Button'
// Utilities
import { Colors, Metrics, Fonts } from "../../../Themes";

// Components

export default class TextInputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.textInput = null;
    }

    render() {
        const { isShowIcon, iconName, iconPress, container, style, iconStyle } = this.props
        return (
            <View style={[styles.container, container]}>
                <TextInput
                    {...this.props}
                    ref={(ref) => this.textInput = ref}
                    onChangeText={this.onChangeText}
                    placeholderTextColor={Colors.secondaryColor}
                    value={this.props.value}
                    underlineColorAndroid={"transparent"}
                    style={[styles.input, style]}
                />
                {isShowIcon ? (
                    <Button
                        onPress={iconPress}
                        iconType={"ImageIcon"}
                        name={iconName}
                        buttonStyle={[styles.iconStyle, iconStyle]}
                        isHideLabel
                        isLoading={false}
                        hitSlop={{ top: 20, left: 15, bottom: 20, right: 20 }}
                    />
                )
                    : null
                }

            </View>
        );
    }
    focus = () => {
        this.textInput.focus();
    }
    onChangeText = value => {
        // console.log('onChangeText value: ', value)
        this.props.onChangeText(value);
        if (this.props.getValue) {
            this.props.getValue(value)
        }

    };

    //   getValue = () => {this.props.getValue(this.state.value)}
}

TextInputComponent.defaultProps = {
    onPress: () => { },
    value: ""
};

TextInputComponent.propTypes = {
    iconPress: PropTypes.func,
    isShowIcon: PropTypes.bool,
    iconName: PropTypes.number,
    value: PropTypes.string,
    style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number
    ]),
    container: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number
    ]),
    iconStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number
    ]),
};

const styles = EStyleSheet.create({
    container: {
        borderWidth: 1,
        width: '100%',
        backgroundColor: Colors.colorF5,
        borderColor: Colors.colorCf,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    input: {

        color: Colors.black,
        //marginBottom: Platform.OS === "ios" ? 20 : 0,
        height: 48,
        paddingLeft: 15,
        fontFamily: Fonts.fontFamily.fontRegular,
        fontSize: Fonts.size.size13
    },
    iconStyle: { width: 16, height: 13, alignSelf: 'center', }

});
