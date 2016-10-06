import MainStyle from '../../../styles'
import StyleSheet from '../../../styles/StyleSheet'

export default StyleSheet.create({
  container: MainStyle.container,
  siteContentContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    ios: {
      paddingTop: 15,
      paddingBottom: 15,
    },
    android: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    backgroundColor: 'white',
  },
  siteContentContainerExpand: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    ios: {
      top: 40,
    },
    android: {
      top: 50,
    },
  },
  subTitle: {
    fontSize: MainStyle.font.big,
    color: 'black',
    fontWeight: 'bold',
    ios: {
      marginBottom: 10,
    },
  },
  distance: {
    fontSize: MainStyle.font.big + 2,
    color: MainStyle.color.main,
    position: 'absolute',
    right: 60,
    ios: {
      top: 12,
    },
    android: {
      top: 8,
    },
  },
  expandContentIcon: {
    position: 'absolute',
    top: 8,
    right: 10,
    backgroundColor: 'white',
    height: 36,
    width: 36,
    zIndex: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: MainStyle.font.medium,
  },
})
