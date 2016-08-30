'use strict';
/**
 * A CLI and OS X app for inspecting your React JS and React Native apps.
 */
import snowflake from './src/snowflake';
import Reactotron from 'reactotron-react-native'
Reactotron
  .configure()
  .connect()

snowflake('ios');
