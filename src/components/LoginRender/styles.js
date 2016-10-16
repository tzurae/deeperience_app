import { StyleSheet } from 'react-native'

export default (StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(255,0,0,0.01)',
    borderColor: 'orange',
  },
  scrollable: {
    borderColor: 'orange',
    padding: 0,
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
}))
