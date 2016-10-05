import MainStyle from '../../../styles'
import StyleSheet from '../../../styles/StyleSheet'

const { btnRadius,
        btnBigRadius,
        btnDiameter,
        btnBigDiameter } = MainStyle.TripSiteButton

export default StyleSheet.create({
  site: {
    borderRadius: btnRadius,
    width: btnDiameter,
    height: btnDiameter,
    position: 'absolute',
    top: btnRadius,
    left: 50 - btnRadius,
    zIndex: 3,
  },
  siteActiveClick: {
    backgroundColor: '#FF4400',
  },
  siteActiveUnclick: {
    backgroundColor: MainStyle.color.main,
  },
  siteDeactive: {
    backgroundColor: 'grey',
  },
  sitePioneer: {
    backgroundColor: MainStyle.color.main,
  },
  siteFrontier: {
    backgroundColor: 'green',
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
    opacity: 0.4,
    zIndex: 1,
    width: btnBigDiameter,
    height: btnBigDiameter,
    position: 'absolute',
    left: 50 - btnBigRadius,
  },
  siteBackgroundActiveClick: {
    backgroundColor: '#FF4400',
  },
  siteBackgroundActiveUnclick: {
    backgroundColor: MainStyle.color.main,
  },
  siteBackgroundDeactive: {
    backgroundColor: 'grey',
  },
  siteBackgroundPioneer: {
    backgroundColor: MainStyle.color.main,
  },
  siteBackgroundFrontier: {
    backgroundColor: 'green',
  },
  siteName: {
    position: 'relative',
    backgroundColor: 'transparent',
    color: 'white',
    zIndex: 1000,
    top: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
