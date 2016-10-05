import MainStyle from '../../../styles'
import StyleSheet from '../../../styles/StyleSheet'

export default StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 121,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#444',
  },
  sideIcon: {
    height: 55,
    width: 50,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sideIconText: {
    fontSize: MainStyle.font.small,
    marginTop: 10,
  },
})
