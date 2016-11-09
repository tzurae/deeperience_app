import StyleSheet from '../../../styles/StyleSheet'

export default StyleSheet.create({
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
  expandMapIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
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
