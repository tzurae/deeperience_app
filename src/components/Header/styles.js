import { StyleSheet } from 'react-native'
import MainStyle from '../../styles'

export default (StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F78B6D',
    padding: 7,
  },
  textStyle: {
    fontSize: MainStyle.font.big,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  backIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
}))
