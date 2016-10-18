import { StyleSheet } from 'react-native'
import MainStyle from '../../styles'

export default StyleSheet.create({
  container: {
    ...MainStyle.container,
    backgroundColor: MainStyle.color.main,
  },
  innerContainer: {
    padding: 30,
  },
  title: {
    fontSize: MainStyle.font.large,
    color: 'white',
    marginBottom: 20,
  },
})
