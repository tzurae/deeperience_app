import { StyleSheet } from 'react-native'
import MainStyle from '../../styles'

export default (StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F78B6D',
    padding: 7,
    flexDirection: 'row',
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
  },
}))
