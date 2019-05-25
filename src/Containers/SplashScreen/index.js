// Libraries
import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { connect } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";

// Utilities
import { ScreenKey } from "../../Constants";
import { Colors, Metrics, Images, Fonts } from "../../Themes";
import I18n from "../../I18n";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.logoImage} source={Images.logo} />
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText}>{I18n.t("splash_screen.label")}</Text>
        </View>
        <View style={styles.introduce}>
          <Text style={styles.introduceText}>
            {I18n.t("splash_screen.introduce")}
          </Text>
        </View>
        <View style={styles.version}>
          <Text style={styles.versionText}>{I18n.t("splash_screen.version")}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoImage: { width: 96, height: 96 },
  label: { marginTop: 30 },
  labelText: {
    fontFamily: Fonts.type.multi.bold,
    fontSize: Fonts.size.h3,
    lineHeight: 38,
    color: Colors.drakBlue,
    letterSpacing: -1.5,
    textAlign: "center"
  },
  introduce: { marginTop: 10 },
  introduceText: {
    fontFamily: Fonts.type.multi.regular,
    fontSize: Fonts.size.medium,
    lineHeight: 18,
    color: Colors.drakBlue,
    textAlign: "center"
  },
  version: { position: "absolute", bottom: 20 },
  versionText: {
    fontFamily: "Muli-Regular",
    fontSize: Fonts.size.size13,
    lineHeight: 16,
    color: Colors.light_slate_gray,
    textAlign: "center"
  }
});
