import { Dimensions, StatusBar, Platform, Alert } from 'react-native';

import { Device } from '../Constants';
import DebugConfig from '../Config/DebugConfig';
import DeviceInfo from 'react-native-device-info';

const DEVICE_UID = DeviceInfo.getUniqueID();
// See https://mydevice.io/devices/ for device dimensions
const X_WIDTH = 375;
const X_HEIGHT = 812;

const isIPhoneX = () => {
  const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

  return Platform.OS === 'ios' &&
    ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
      (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT));
}

// const getStatusBarHeight = () => {

//   return Platform.OS === 'ios' && isIPhoneX() ? Device.IOS_X_STATUS_BAR_HEIGHT : Platform.OS === 'ios' ? Device.IOS_STATUS_BAR_HEIGHT : StatusBar.currentHeight;   
// }

export default {

  // isIPhoneX() {
  //   const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

  //   return Platform.OS === 'ios' &&
  //     ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
  //       (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT));
  // },

  getStatusBarHeight() {
    return Platform.OS === 'ios' && isIPhoneX() ? Device.IOS_X_STATUS_BAR_HEIGHT : Platform.OS === 'ios' ? Device.IOS_STATUS_BAR_HEIGHT : StatusBar.currentHeight;
  },
  log(...arg) {
    if (DebugConfig.isShowLog) {
      console.log(...arg);
    }
  },
  msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds
  },
  showError(title, error, cb) {
    Alert.alert(
      title,
      error,
      [
        { text: 'OK', onPress: cb ? () => cb() : () => { } },
      ],
      { cancelable: false },
    );
  },
  DEVICE_UID

}