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
  displayInfo: {
    position: 'absolute',
    bottom: 0,
    zIndex: 200,
    backgroundColor: '#ffffff',
    borderColor: '#dddddd',
    borderWidth: 1,
  },
  displayInfoCard: {
    flex: 1,
    padding: 20,
  },
  displayInfoTitle: {
    fontSize: MainStyle.font.big,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  displayInfoIntroduction: {
    fontSize: MainStyle.font.medium,
    color: '#111111',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 25,
    width: 25,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapBtn: {
    color: 'white',
    fontSize: MainStyle.font.medium,
  },
  mapBtnContainer: {
    backgroundColor: MainStyle.color.main,
    padding: 5,
    width: 90,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 18,
    right: 15,
  },
}))
