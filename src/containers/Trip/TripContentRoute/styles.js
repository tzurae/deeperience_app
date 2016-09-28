import MainStyle from '../../../styles'
import StyleSheet from '../../../styles/StyleSheet'

const btnDiameter = 14
const btnBigDiameter = 28

export default StyleSheet.create({
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
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconContainer: {
    width: 40,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayInfoCard: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 10,
    ios: {
      paddingTop: 5,
      paddingBottom: 5,
    },
  },
  displayInfoTitle: {
    fontSize: MainStyle.font.big,
    color: 'black',
    fontWeight: 'bold',
    ios: {
      marginBottom: 10,
    },
  },
  displayInfoIntroduction: {
    fontSize: MainStyle.font.medium,
    color: '#111111',
  },
  sideIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
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
  walkInstruction: {
    fontSize: MainStyle.font.medium,
    ios: {
      lineHeight: 15,
    },
    android: {
      lineHeight: 25,
    },
  },
  transitInstruction: {
    fontSize: MainStyle.font.medium,
    maxWidth: 160,
    position: 'relative',
    top: 5,
    ios: {
      lineHeight: 15,
    },
    android: {
      lineHeight: 25,
    },
  },
  transitListNumber: {
    fontSize: MainStyle.font.medium,
    lineHeight: 25,
    width: 18,
  },
  transitDuration: {
    lineHeight: 22,
    color: 'orange',
    fontSize: MainStyle.font.medium - 1,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  transitDistance: {
    lineHeight: 22,
    color: '#4285F4',
    fontSize: MainStyle.font.medium - 1,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  transitTimeInterval: {
    lineHeight: 22,
    color: '#20D061',
    fontSize: MainStyle.font.medium - 2,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  transitHelpWord: {
    fontSize: MainStyle.font.medium,
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  transitGray: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 10,
    paddingLeft: 15,
    backgroundColor: '#ddd',
  },
  transitWhite: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 10,
    paddingLeft: 15,
    backgroundColor: 'white',
  },
})
