'use strict';

import snowflake from './src/snowflake';
import Reactotron from 'reactotron-react-native'
Reactotron
  .configure() // we can use plugins here -- more on this later
  .connect() // let's connect!
snowflake('ios');
