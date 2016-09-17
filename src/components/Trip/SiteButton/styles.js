import { StyleSheet } from 'react-native'
import MainStyle from '../../../styles'

const { btnRadius,
        btnBigRadius,
        btnDiameter,
        btnBigDiameter } = MainStyle.TripSiteButton

export default (StyleSheet.create({
  site: {
    borderRadius: btnRadius,
    backgroundColor: MainStyle.color.main,
    width: btnDiameter,
    height: btnDiameter,
    position: 'absolute',
    top: btnRadius,
    left: 50 - btnRadius,
    zIndex: 3,
  },
  siteShadow: {
    borderRadius: btnRadius,
    backgroundColor: 'black',
    opacity: 0.3,
    zIndex: 2,
    width: btnDiameter,
    height: btnDiameter,
    position: 'absolute',
    top: btnRadius + 1,
    left: 50 - btnRadius + 1,
  },
  siteBackground: {
    borderRadius: btnBigRadius,
    backgroundColor: MainStyle.color.main,
    opacity: 0.5,
    zIndex: 1,
    width: btnBigDiameter,
    height: btnBigDiameter,
    position: 'absolute',
    left: 50 - btnBigRadius,
  },
  siteName: {
    position: 'relative',
    top: 30,
  },
}))
