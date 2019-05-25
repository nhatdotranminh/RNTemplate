/**
 * @format
 */


import {name as appName} from './app.json';
import './src/Config/ReactotronConfig'
import {AppRegistry} from 'react-native';
import App from './src/Containers/App';

AppRegistry.registerComponent(appName, () => App);
