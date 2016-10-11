import authSaga from '../reducers/auth/authSaga'
import tripSaga from '../reducers/trip/tripSaga'

export default function* sagas() {
  yield [
    ...authSaga,
    ...tripSaga,
  ]
}
