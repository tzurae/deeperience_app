// @flow
'use strict'
import ModelInterface from './ModelInterface'
// import R from 'reactotron-react-native'

type idType = string
type userDataType = {
  name: string,
  nickname: ?string,
}

const PATH = '/users/'

export default class UserModel extends ModelInterface {
  constructor(id: idType, userData : userDataType) {
    super(userData)
    this.id = id
    this.data = userData
  }
  getPath() {
    return `${PATH}${this.id}`
  }
  getData() {
    return this.data
  }
}

