import MainStyle from '../../../styles'
import StyleSheet from '../../../styles/StyleSheet'

export default StyleSheet.create({
  infoContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    android: {
      paddingTop: 2,
      paddingBottom: 5,
    },
    ios: {
      paddingTop: 5,
      paddingBottom: 5,
    },
  },
  displayInfoCard: {
    flex: 1,
  },
  displayInfoTitle: {
    fontSize: MainStyle.font.big,
    color: 'black',
    fontWeight: 'bold',
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
  closeIcon: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 100,
  },
  displayInfoTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  tagView: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: MainStyle.color.main,
    marginLeft: 5,
    marginRight: 5,
    color: 'white',
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 6,
    paddingLeft: 6,
  },
  displayInfoSubtitle: {
    fontSize: MainStyle.font.medium + 2,
    color: 'black',
    marginTop: 20,
    marginBottom: 5,
  },
  content: {
    fontSize: MainStyle.font.medium + 1,
  },
  indicator: {
    fontSize: MainStyle.font.big,
    color: 'black',
  },
})
