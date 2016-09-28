import MainStyle from '../../styles'
import StyleSheet from '../../styles/StyleSheet'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F78B6D',
    flexDirection: 'row',
    ios: {
      padding: 10,
    },
    android: {
      padding: 7,
    },
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
      top: 7,
    },
    android: {
      top: 9,
    },
  },
})
