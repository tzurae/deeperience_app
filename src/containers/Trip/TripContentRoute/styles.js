import { StyleSheet } from 'react-native'
import MainStyle from '../../../styles'

const btnDiameter = 14
const btnBigDiameter = 28

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
    borderRadius: btnDiameter / 2,
    backgroundColor: MainStyle.color.main,
    width: btnDiameter,
    height: btnDiameter,
    position: 'absolute',
    top: btnDiameter / 2,
    left: 50 - btnDiameter / 2,
    zIndex: 3,
  },
  siteShadow: {
    borderRadius: btnDiameter / 2,
    backgroundColor: 'black',
    opacity: 0.3,
    zIndex: 2,
    width: btnDiameter,
    height: btnDiameter,
    position: 'absolute',
    top: btnDiameter / 2 + 1,
    left: 50 - btnDiameter / 2 + 1,
  },
  siteBackground: {
    borderRadius: btnBigDiameter / 2,
    backgroundColor: MainStyle.color.main,
    opacity: 0.5,
    zIndex: 1,
    width: btnBigDiameter,
    height: btnBigDiameter,
    position: 'absolute',
    left: 50 - btnBigDiameter / 2,
  },
  siteName: {
    position: 'relative',
    top: 30,
  },
}))
