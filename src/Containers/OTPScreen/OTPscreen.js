// Libraries
import React, { PureComponent } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Platform, Image, ScrollView, Keyboard
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import EStyleSheet from "react-native-extended-stylesheet";

// Utilities
import { ScreenKey } from "../../Constants";
import { Colors, Metrics, Images, Fonts, ApplicationStyles } from "../../Themes";
import I18n from "../../I18n";
import { CommonUtils } from "../../Utils";
import { SafeAreaView } from 'react-navigation';
//Components
import NavBar from "../../Components/Common/NavBar";
import Button from "../../Components/Common/Button";
import TextInput from '../../Components/Common/TextInput'
import OtpInput from '../../Components/Common/OTPInput'
// Reduxes
// import LoginActions from '../Redux/LoginRedux';
import AuthenticateActions from "../../Redux/AuthenticateRedux";

class OTPScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            otpCode: "",
            resendCodeTimeOut: 1000 * 180
        };

        this.resendTimeout = null;
    }
    componentDidMount() {
        this.setTimeoutResendCode()
    }
    componentWillReceiveProps(nextProps) {
        const { authentication: { isSignup, error, isLogin, isSendOTP, isReSendOTP, userRegister } } = nextProps;
        const { authenticateErrorSet } = this.props;

        if (error && isSignup && !isLogin) {
            //CommonUtils.log('SignUp error', error);
            CommonUtils.showError(I18n.t('error.hasError'), error, authenticateErrorSet);
        }
    }

    componentWillUnmount() {
        if (this.resendTimeout) {
            clearInterval(this.resendTimeout);
            this.resendTimeout = null;
        }
    }
    render() {
        const { authentication } = this.props;
        const { resendCodeTimeOut } = this.state;
        //CommonUtils.log('LoginScreen render this.props: ', authentication)
        return (
            <View style={ApplicationStyles.container} >
                <ScrollView style={{ flex: 1 }} bounces={false}>
                    <View style={ApplicationStyles.imageLogoContainer}>
                        <Image source={Images.icOTP} resizeMode={'contain'} />
                    </View>


                    <View style={ApplicationStyles.wrapper}>
                        <Text style={ApplicationStyles.titleText}>
                            {I18n.t("otp.title")}
                        </Text>
                        <Text style={[ApplicationStyles.contentText, styles.contentText]}>
                            {I18n.t("otp.content")}
                        </Text>

                        <OtpInput
                            containerStyles={{ padding: 0 }}
                            inputContainerStyles={styles.inputCode}
                            handleChange={code => { this.setState({ otpCode: code }) }}
                            numberOfInputs={6}
                            unFocusedBorderColor={Colors.colorCf}
                            focusedBorderColor={Colors.primaryColor}
                            inputStyles={{ color: Colors.primaryColor }}
                        />
                        <View style={styles.btnForgotPw}>
                            {
                                resendCodeTimeOut === 0 ? (
                                    <Text
                                        onPress={this.resendCode}
                                        style={styles.touchAbleText}>{` ${I18n.t("btn.resendCode")}`}</Text>
                                ) : (
                                        <Text
                                            style={styles.touchAbleText}>{` ${CommonUtils.msToTime(resendCodeTimeOut)}`}</Text>
                                    )
                            }


                        </View>
                        <Button
                            onPress={this.onPressSubmit}
                            labelWrapper={ApplicationStyles.btnLabelWrapper}
                            label={I18n.t("btn.confirm")}
                            buttonStyle={styles.btnLogIn}
                            labelText={styles.btnLogInText}
                            isHideIcon
                            isLoading={authentication.fetching}
                        />



                    </View>
                    {
                        // Render Back button 
                    }
                    <Button
                        onPress={() => { }}
                        iconType={"ImageIcon"}
                        name={Images.icBackArrowOpacity}
                        buttonStyle={ApplicationStyles.backButton}
                        isHideLabel
                        isLoading={false}
                    />
                </ScrollView>

            </View>

        );
    }
    setTimeoutResendCode = () => {
        this.resendTimeout = setInterval(() => {
            this.setState({
                resendCodeTimeOut: this.state.resendCodeTimeOut - 1000
            })
            if (this.state.resendCodeTimeOut === 0) {
                clearInterval(this.resendTimeout);
                this.resendTimeout = null;
            }
        }, 1000)
    }
    resendCode = () => {
        this.setState({
            resendCodeTimeOut: 1000 * 180
        }, () => {
            this.onPressReSendOTP()
            this.setTimeoutResendCode()
        })

    }
    onPressReSendOTP = () => {
        const { authenticate } = this.props;
        // attempt a login - a saga is listening to pick it up from here.
        const isSignup = true;
        const isLogin = false;
        const isSendOTP = true;
        const isReSendOTP = true;
        const param = { isSignup, isLogin, isSendOTP, isReSendOTP };

        authenticate(param)

    }
    onPressSubmit = () => {
        const { authenticate } = this.props;
        const { otpCode } = this.state;
        // attempt a login - a saga is listening to pick it up from here.
        const isSignup = true;
        const isLogin = false;
        const isSendOTP = false;
        const isReSendOTP = false;
        const user = { otpCode };
        const param = { isSignup, isLogin, isSendOTP, isReSendOTP, user };
        if (otpCode.length === 0) {
            CommonUtils.showError(I18n.t('error.hasError'), I18n.t('error.enterOtpCode'));
        } else {
            authenticate(param)
        }
        //CommonUtils.log("Login Screen onPressLogin authentication: ", param)

    };
}

const mapStateToProps = state => {
    // CommonUtils.log("LoginScreen mapStateToProps state: ", state)
    return {
        authentication: state.authenticate
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authenticate: param =>
            dispatch(AuthenticateActions.authenticateRequest(param)),
        authenticateErrorSet: () => dispatch(AuthenticateActions.authenticateErrorSet())

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OTPScreen);

const styles = EStyleSheet.create({
    contentText: {
        paddingHorizontal: 0,
        paddingTop: 15, paddingBottom: 30
    },
    btnLogIn: {
        height: 50,
        backgroundColor: Colors.primaryColor,
        borderRadius: 5,
        marginTop: 30
    },
    btnLogInText: {
        fontFamily: Fonts.fontFamily.fontBold,
        fontSize: Fonts.size.size15,
        color: Colors.white,

    },

    inputCode: {
        backgroundColor: Colors.colorF5,
        marginHorizontal: 5,
        width: 40,
        height: 50
    },
    btnForgotPw: {
        backgroundColor: Colors.transparent,
        marginTop: 5
    },
    touchAbleText: {
        fontFamily: Fonts.fontFamily.fontSemiBold,
        fontSize: Fonts.size.size13,
        color: Colors.primaryColor,
    },

});
