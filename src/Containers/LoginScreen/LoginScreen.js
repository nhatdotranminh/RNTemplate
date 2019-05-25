// Libraries
import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform, Image, ScrollView, Keyboard, Alert
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

// Reduxes
// import LoginActions from '../Redux/LoginRedux';
import AuthenticateActions from "../../Redux/AuthenticateRedux";

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.keyboardWillShow = this.keyboardWillShow.bind(this)
    this.keyboardWillHide = this.keyboardWillHide.bind(this)


    this.state = {
      phone: "",
      passWord: "",
      secureTextEntry: true,
      isKeyboardShow: false
    };
  }
  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }
  componentWillReceiveProps(nextProps) {
    const { authentication: { isSignup, error, isLogin, isSendOTP, isReSendOTP } } = nextProps;
    const { authenticateErrorSet } = this.props;
    if (error && !isSignup && isLogin && !isSendOTP && !isReSendOTP) {
      CommonUtils.log('Login error', error)
      CommonUtils.showError(I18n.t('error.hasError'), error, authenticateErrorSet)
      // Alert.alert(
      //   I18n.t('error.hasError'),
      //   error,
      //   [
      //     { text: 'OK', onPress: () => this.props.authenticateErrorSet() },
      //   ],
      //   { cancelable: false },
      // );
      // this.props.authenticateErrorSet()
    }
  }
  keyboardWillShow = event => {
    this.setState({
      isKeyboardShow: true
    })
  }

  keyboardWillHide = event => {
    this.setState({
      isKeyboardShow: false
    })
  }
  render() {
    const { authentication } = this.props;
    const { isKeyboardShow, secureTextEntry } = this.state;
    //CommonUtils.log('LoginScreen render this.props: ', authentication)
    return (
      <View style={ApplicationStyles.container} >
        <ScrollView style={{ flex: 1 }} bounces={false}>

          <Image source={Images.bgOnBoarding} style={ApplicationStyles.bgCoverSmall} />

          <View style={ApplicationStyles.wrapper}>
            <Text style={ApplicationStyles.titleText}>
              {I18n.t("login.title")}
            </Text>
            <Text style={[ApplicationStyles.contentText, styles.contentText]}>
              {I18n.t("login.content")}
            </Text>
            <TextInput
              ref={email => (this.inputEmail = email)}
              placeholder={I18n.t("userAuth.enterPhone")}
              keyboardType={"phone-pad"}
              returnKeyType={"next"}
              autoCapitalize={"none"}
              onSubmitEditing={() => this.inputPassword.focus()}
              value={this.state.phone}
              onChangeText={text => this.setState({ phone: text })}
            />
            <TextInput
              ref={password => (this.inputPassword = password)}
              style={{
                width: '90%'
              }}
              placeholder={I18n.t("userAuth.enterPassword")}
              secureTextEntry={this.state.secureTextEntry}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              onSubmitEditing={() => this.onPressLogin()}
              value={this.state.passWord}
              onChangeText={text => this.setState({ passWord: text })}
              isShowIcon
              iconName={secureTextEntry ? Images.icHidePW : Images.icShowPW}
              iconPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}
              container={styles.inputPwContainer}
            />
            <Button
              onPress={() => this.onPressLogin()}
              labelWrapper={ApplicationStyles.btnLabelWrapper}
              label={I18n.t("btn.signIn")}
              buttonStyle={styles.btnLogIn}
              labelText={styles.btnLogInText}
              isHideIcon
              isLoading={authentication.fetching}
            />
            <Button
              onPress={this.navigateForgot}
              labelWrapper={ApplicationStyles.btnLabelWrapper}
              label={I18n.t("btn.forgot")}
              buttonStyle={styles.btnForgotPw}
              labelText={styles.touchAbleText}
              isHideIcon
              isLoading={false}
            />

          </View>
          {
            // Render Back button 
          }
          <Button
            onPress={this.navigateBack}
            iconType={"ImageIcon"}
            name={Images.icCloseOpacity}
            buttonStyle={ApplicationStyles.backButton}
            isHideLabel
            isLoading={false}
          />
        </ScrollView>
        {
          isKeyboardShow ? null : (
            <View style={ApplicationStyles.bottomViewWrapper}>
              <Text style={styles.text}>{I18n.t("login.notYetHaveAccount")}
                <Text
                  onPress={this.navigateSignUp}
                  style={styles.touchAbleText}>{` ${I18n.t("login.signUpNow")}`}</Text>
              </Text>

            </View>
          )
        }

      </View>

    );
  }
  navigateBack = () => {
    this.props.navigation.goBack()
  }
  navigateSignUp = () => {
    this.props.navigation.navigate(ScreenKey.SIGNUP_SCREEN)
  }
  navigateForgot = () => {
    this.props.navigation.navigate(ScreenKey.FORGOT_SCREEN)
  }
  onPressLogin = () => {
    const { phone, passWord } = this.state;
    const { authenticate, authentication } = this.props;
    // attempt a login - a saga is listening to pick it up from here.
    const user = { phone, passWord };
    const isSignup = false;
    const isLogin = true;
    const isSendOTP = false;
    const isReSendOTP = false;
    const param = { isSignup, isLogin, isSendOTP, isReSendOTP, user };
    if (phone === '' || passWord === '') {
      if (phone === '') {
        CommonUtils.showError(I18n.t('error.hasError'), I18n.t('error.enterPhone'))
      }
      if (passWord === '') {
        CommonUtils.showError(I18n.t('error.hasError'), I18n.t('error.enterPassword'))
      }
    } else {
      authenticate(param)
    }
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
)(LoginScreen);

const styles = EStyleSheet.create({
  contentText: {
    paddingHorizontal: 0,
    paddingTop: 15, paddingBottom: 30
  },
  inputPwContainer: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 0,
    flexDirection: 'row',
    paddingRight: 10
  },
  btnLogIn: {
    height: 50,
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    marginTop: 20
  },
  btnLogInText: {
    fontFamily: Fonts.fontFamily.fontBold,
    fontSize: Fonts.size.size15,
    color: Colors.white,

  },
  btnForgotPw: {
    backgroundColor: Colors.transparent,
    marginTop: 20
  },
  touchAbleText: {
    fontFamily: Fonts.fontFamily.fontSemiBold,
    fontSize: Fonts.size.size13,
    color: Colors.primaryColor,
  },
  text: {
    color: Colors.secondaryColor, fontFamily: Fonts.fontFamily.fontRegular,
    fontSize: Fonts.size.size13,
  }
});
