import MainStyle from '../../../styles'
import StyleSheet from '../../../styles/StyleSheet'

export default StyleSheet.create({
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
  audioThumb: {
    backgroundColor: MainStyle.color.main,
  },
  audioTrack: {
    backgroundColor: '#d0d0d0',
  },
})
