/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import { LogBox } from 'react-native';
import {name as appName} from './app.json';
LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent(appName, () => App);
