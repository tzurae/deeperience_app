import { StyleSheet } from 'react-native'
import MainStyle from '../../../styles'

export default (StyleSheet.create({
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
  titleContainer: {
    paddingTop: 0,
    paddingBottom: 10,
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
    height: 44,
    width: 44,
    backgroundColor: MainStyle.color.main,
    borderRadius: 22,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  siteContentContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  subTitle: {
    fontSize: MainStyle.font.large,
    color: 'black',
    fontWeight: 'bold',
  },
  content: {
    fontSize: MainStyle.font.medium,
  },
  distance: {
    fontSize: 36,
    color: MainStyle.color.main,
    position: 'absolute',
    top: 0,
    right: 20,
  },
}))
