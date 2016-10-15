import MainStyle from '../../styles'
import StyleSheet from '../../styles/StyleSheet'
import Dimensions from 'Dimensions'
const { width } = Dimensions.get('window') // Screen dimensions in current orientation

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MainStyle.color.main,
    flexDirection: 'column',
    ios: {
      padding: 10,
      paddingTop: 20,
    },
    android: {
      padding: 7,
    },
  },
  iosbar: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 14,
    width,
  },
  textStyle: {
    fontSize: MainStyle.font.big,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  backIcon: {
    alignSelf: 'flex-start',
    position: 'absolute',
    left: 10,
    ios: {
      top: 17,
    },
    android: {
      top: 9,
    },
  },
})
