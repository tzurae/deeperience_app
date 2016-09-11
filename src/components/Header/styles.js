const React = require('react-native')
const { StyleSheet } = React
module.exports = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 10,
  },
  header: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  mark: {
    height: 100,
    width: 100,
  },
})
