import { StyleSheet } from 'react-native'
import MainStyle from '../../../styles'

export default (StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    height: 800,
  },
  containerFetching: {
    alignItems: 'stretch',
    backgroundColor: 'black',
    flex: 1,
    height: 800,
  },
  site: {
    borderRadius: 7,
    backgroundColor: MainStyle.color.main,
    width: 14,
    height: 14,
    position: 'absolute',
    top: 7,
    left: 7,
    zIndex: 2,
  },
  siteShadow: {
    borderRadius: 7,
    backgroundColor: 'black',
    opacity: 0.3,
    zIndex: 1,
    width: 14,
    height: 14,
    position: 'absolute',
    top: 8,
    left: 8,
  },
  siteBackground: {
    borderRadius: 14,
    backgroundColor: MainStyle.color.main,
    opacity: 0.5,
    zIndex: 1,
    width: 28,
    height: 28,
  },
}))
