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
  siteActive: {
    backgroundColor: 'blue',
  },
  siteDeactive: {
    backgroundColor: MainStyle.color.main,
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
    opacity: 0.5,
    zIndex: 1,
    width: btnBigDiameter,
    height: btnBigDiameter,
    position: 'absolute',
    left: 50 - btnBigRadius,
  },
  siteBackgroundActive: {
    backgroundColor: 'blue',
  },
  siteBackgroundDeactive: {
    backgroundColor: MainStyle.color.main,
  },
  siteName: {
    position: 'relative',
    backgroundColor: '#eaeaea',
    zIndex: 1000,
    top: 35,
    textAlign: 'center',
  },
})
