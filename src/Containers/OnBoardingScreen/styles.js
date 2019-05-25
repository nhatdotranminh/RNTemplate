import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Metrics, Fonts } from "../../Themes";

const styles = EStyleSheet.create({
    btnContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    btnText: {
        fontFamily: Fonts.fontFamily.fontBold,
        fontSize: Fonts.size.size15,
        color: Colors.white,
    },
    button: {
        width: Metrics.screenWidth / 2 - 20,
        height: 50,
        backgroundColor: Colors.primaryColor,
        marginLeft: 5,
        marginRight: 5,

    },
    buttonLogin: {
        backgroundColor: 'transparent',
        borderColor: Colors.primaryColor,
        borderWidth: 1
    },
    loginText: {
        color: Colors.primaryColor
    },


});
export default styles;