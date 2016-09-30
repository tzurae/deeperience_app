import MainStyle from '../../../styles'
import StyleSheet from '../../../styles/StyleSheet'

export default StyleSheet.create({
  container: MainStyle.container,
  mapContainer: {
    alignItems: 'center',
    backgroundColor: 'black',
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapDisplayModeTrue: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  titleContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainTitle: {
    fontSize: MainStyle.font.big,
    color: 'black',
    fontWeight: 'bold',
  },
  audioLengthContainer: {
    borderColor: MainStyle.color.main,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    height: 30,
    width: 80,
  },
  audioLength: {
    fontSize: MainStyle.font.big,
    color: MainStyle.color.main,
  },
  audioButton: {
    height: 36,
    width: 36,
    backgroundColor: MainStyle.color.main,
    borderRadius: 18,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  },
  subTitle: {
    fontSize: MainStyle.font.big,
    color: 'black',
    fontWeight: 'bold',
    ios: {
      marginBottom: 10,
    },
  },
  content: {
    fontSize: MainStyle.font.medium,
  },
  distance: {
    fontSize: MainStyle.font.big + 2,
    color: MainStyle.color.main,
    position: 'absolute',
    right: 20,
    ios: {
      top: 10,
    },
    android: {
      top: 8,
    },
  },
  audioThumb: {
    backgroundColor: MainStyle.color.main,
  },
  audioTrack: {
    backgroundColor: '#d0d0d0',
  },
  expandMapIcon: {
    position: 'absolute',
    bottom: 10,
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
})
