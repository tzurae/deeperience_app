import style from './origin'
import { StyleSheet, Image } from 'react-native'
import Dimensions from 'Dimensions'
const { width } = Dimensions.get('window') // Screen dimensions in current orientation

export default {
  ...style,
  container: {
    flexDirection: 'column',
    flex: 1,
  },
}

export const HTMLStyle = StyleSheet.create({
  img: {
    width: width - 30,
    height: width - 100,
    resizeMode: Image.resizeMode.contain,
    margin: 0,
    padding: 0,
  },
  imgWrapper: {
    marginTop: -25,
    marginBottom: -35,
  },
  p: {
    fontSize: 16,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: 16,
  },
  pwrapper: {
    marginTop: 6,
    marginBottom: 6,
  },
  h6: {
    fontSize: 14,
    textAlign: 'center',
    width,
    justifyContent: 'center',
  },
  h6wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 12,
  },
})
