import { StyleSheet } from 'react-native'
import Mainstyle from '../../styles'

export default (StyleSheet.create({
  container: Mainstyle.container,
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    marginLeft: 10,
    marginRight: 10,
  },
  nav: {
    height: 125,
    margin: 10,
    borderRadius: 10,
  },
}))
