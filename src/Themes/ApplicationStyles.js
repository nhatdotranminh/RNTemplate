import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import EStyleSheet from "react-native-extended-stylesheet";

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  // Background Cover image
  bgCoverBig: {
    width: Metrics.screenWidth,
    height: Metrics.isIphoneX ? Math.round(Metrics.screenWidth * 1.5) : Math.round(Metrics.screenWidth * 1.173),
    resizeMode: 'cover'
  },
  bgCoverSmall: {
    width: Metrics.screenWidth,
    height: Metrics.isIphoneX ? Math.round(Metrics.screenWidth * 1.173) : Math.round(Metrics.screenWidth * 0.5),
    maxHeight: 250,
    resizeMode: 'cover'
  },
  imageLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Metrics.isIphoneX ? 100 : 80
  },
  // Title
  titleText: {
    fontFamily: Fonts.fontFamily.fontExtraBold,
    fontSize: Fonts.size.size22,
    color: Colors.drakBlue,
    textAlign: 'center',
    paddingTop: 30
  },
  contentText: {
    fontFamily: Fonts.fontFamily.fontRegular,
    fontSize: Fonts.size.size13,
    color: Colors.secondaryColor,
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingTop: 8
  },

  // button
  btnLabelWrapper: {
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: 'blue',
    // paddingLeft: 10,
    // paddingRight: 20,
  },
  // back Button
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    top: Metrics.isIphoneX ? 50 : 35
  },
  // Input Wrapper Auth flow
  wrapper: {
    width: Metrics.screenWidth - 80,
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomViewWrapper: {
    height: Metrics.isIphoneX ? 80 : 55,
    backgroundColor: Colors.white,
    width: Metrics.screenWidth,
    borderTopWidth: 0.5,
    borderColor: Colors.dividerColor,
    justifyContent: 'center',
    alignItems: 'center'
  }

})

export default ApplicationStyles
