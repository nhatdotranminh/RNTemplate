// Libraries
import React, { PureComponent } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform, Image, StatusBar
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
// Utilities
import { ScreenKey } from "../../Constants";
import { Images, ApplicationStyles } from "../../Themes";
import I18n from "../../I18n";
import { CommonUtils } from "../../Utils";
import styles from './styles'
//Components
import NavBar from "../../Components/Common/NavBar";
import Button from "../../Components/Common/Button";

// Reduxes
// import LoginActions from '../Redux/LoginRedux';
import AuthenticateActions from "../../Redux/AuthenticateRedux";

class OnboardingScreen extends PureComponent {
    constructor(props) {
        super(props);

    }
    navigateLogin = () => {
        return this.props.navigation.navigate(ScreenKey.LOGIN_SCREEN)
    }
    navigateSignUp = () => {
        return this.props.navigation.navigate(ScreenKey.SIGNUP_SCREEN)
    }
    navigateBack = () => {

    }
    render() {

        // CommonUtils.log('LoginScreen render this.props: ', this.props)
        return (
            <View style={ApplicationStyles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent
                />
                <Image source={Images.bgOnBoarding} style={ApplicationStyles.bgCoverBig} />
                <Text style={ApplicationStyles.titleText}>
                    {I18n.t("onBoarding.title")}
                </Text>
                <Text style={ApplicationStyles.contentText}>
                    {I18n.t("onBoarding.content")}
                </Text>
                <View style={styles.btnContainer}>
                    <Button
                        onPress={this.navigateLogin}
                        labelWrapper={ApplicationStyles.btnLabelWrapper}
                        label={I18n.t("btn.signIn")}
                        buttonStyle={[styles.button, styles.buttonLogin]}
                        labelText={[styles.btnText, styles.loginText]}
                        isHideIcon
                        isLoading={false}
                    />
                    <Button
                        onPress={this.navigateSignUp}
                        labelWrapper={ApplicationStyles.btnLabelWrapper}
                        label={I18n.t("btn.signUp")}
                        buttonStyle={[styles.button]}
                        labelText={styles.btnText}
                        isHideIcon
                        isLoading={false}
                    />
                </View>
                <Button
                    onPress={this.navigateBack}
                    iconType={"ImageIcon"}
                    name={Images.icBackArrowOpacity}
                    buttonStyle={[ApplicationStyles.backButton]}
                    isHideLabel
                    isLoading={false}
                />
            </View>
        );
    }


}

export default OnboardingScreen;

