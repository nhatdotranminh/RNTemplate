// Libraries
import React, { PureComponent } from 'react';
import {
  View, 
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

// Utilities
import {ScreenKey} from '../Constants';
import { Colors } from '../Themes';
import I18n from '../I18n';

//Components
import NavBar from '../Components/Common/NavBar';
import Button from '../Components/Common/Button';

class AScreen extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>

        <NavBar title={I18n.t('aScreen')}
          isHideRightButton
          onPressLeftButton={this.props.navigation.openDrawer}
        />

        <View style={[styles.body]}>

          <Button onPress={() => navigate(ScreenKey.HOME_SCREEN)}
            labelWrapper={styles.loginLabelWrapper}
            label={I18n.t('home')}
            buttonStyle={[styles.button]}
            labelStyle={styles.titleText}
            isHideIcon
          />

          <Button onPress={() => navigate(ScreenKey.A_SCREEN_DETAIL)}
            labelWrapper={styles.loginLabelWrapper}
            label={I18n.t('aDetailScreen')}
            buttonStyle={[styles.button]}
            labelStyle={styles.titleText}
            isHideIcon
          />
        </View>
      </View>
    );

  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(AScreen);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,

  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginLabelWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  loginIconWrapper: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10
  },
  button:{
    width: 150, 
    height: 50, 
    backgroundColor: Colors.blueSky, 
    margin: 10
  }
});