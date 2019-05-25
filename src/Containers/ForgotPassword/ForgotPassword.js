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

// Reduxes
// import LoginActions from '../Redux/LoginRedux';
import AuthenticateActions from "../../Redux/AuthenticateRedux";

class ForgotPasswordScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
        };
    }

    render() {
        const { authentication } = this.props;
        //CommonUtils.log('LoginScreen render this.props: ', authentication)
        return (
            <View style={ApplicationStyles.container} >
                <ScrollView style={{ flex: 1 }} bounces={false}>

                    <Image source={Images.bgOnBoarding} style={ApplicationStyles.bgCoverSmall} />

                    <View style={ApplicationStyles.wrapper}>
                        <Text style={ApplicationStyles.titleText}>
                            {I18n.t("forgot.title")}
                        </Text>
                        <Text style={[ApplicationStyles.contentText, styles.contentText]}>
                            {I18n.t("forgot.content")}
                        </Text>
                        <TextInput
                            ref={email => (this.inputEmail = email)}
                            placeholder={I18n.t("userAuth.enterPhoneNumberSignUp")}
                            keyboardType={"phone-pad"}
                            returnKeyType={"done"}
                            autoCapitalize={"none"}
                            onSubmitEditing={() => this.onPressLogin()}
                            value={this.state.phone}
                            onChangeText={text => this.setState({ phone: text })}
                        />

                        <Button
                            onPress={() => this.onPressLogin()}
                            labelWrapper={ApplicationStyles.btnLabelWrapper}
                            label={I18n.t("btn.resetPassword")}
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

    onPressLogin = () => {
        const { phone, passWord } = this.state;
        const { authenticate } = this.props;
        // attempt a login - a saga is listening to pick it up from here.
        const user = { phone, passWord };
        const isSignup = false;
        const isLogin = true;
        const param = { isSignup, isLogin, user };

        //CommonUtils.log("Login Screen onPressLogin authentication: ", param)
        authenticate(param)
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
            dispatch(AuthenticateActions.authenticateRequest(param))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordScreen);

const styles = EStyleSheet.create({
    contentText: {
        paddingHorizontal: 0,
        paddingTop: 15, paddingBottom: 30
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

});
