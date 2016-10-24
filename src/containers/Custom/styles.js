import MainStyle from '../../styles'
import StyleSheet from '../../styles/StyleSheet'
import { height } from '../../lib/dimensions'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    ios: {
      paddingTop: 30,
      paddingBottom: 30,
      paddingRight: 20,
      paddingLeft: 20,
    },
    android: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingRight: 20,
      paddingLeft: 20,
    },
  },
  centerContainer: {
    alignItems: 'center',
  },
  innerView: {
    alignItems: 'center',
    height: height - 90,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  title: {
    color: MainStyle.color.main,
    fontSize: MainStyle.font.big + 2,
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    ios: {
      marginTop: 8,
    },
    android: {
      marginTop: 3,
    },
    fontWeight: 'bold',
  },
  customView: {
    backgroundColor: '#4d5d70',
    padding: 20,
  },
  option: {
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  optionText: {
    color: 'white',
    fontSize: MainStyle.font.medium,
    marginBottom: 5,
  },
  trackStyle: {
    height: 4,
    borderRadius: 2,
  },
  selectedTrackStyle: {
    backgroundColor: '#32a69e',
  },
  unselectedTrackStyle: {
    backgroundColor: '#b7b7b7',
  },
  markerStyle: {
    backgroundColor: '#32a69e',
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  pressedMarkerStyle: {
    backgroundColor: '#b7b7b7',
  },
})
