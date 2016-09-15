import authSaga from '../reducers/auth/authSaga'

export default function* sagas() {
  yield [
    ...authSaga,
  ]
}