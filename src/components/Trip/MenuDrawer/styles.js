import MainStyle from '../../../styles'
import StyleSheet from '../../../styles/StyleSheet'

export default StyleSheet.create({
  iconContainer: {
    height: 60,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  sideIcon: {
    flex: 1,
    height: 40,
    backgroundColor: '#444',
  },
  sideIconText: {
    fontSize: MainStyle.font.small,
    marginTop: 1,
  },
})
