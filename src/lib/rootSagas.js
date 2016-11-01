import authSaga from '../reducers/auth/authSaga'
import tripSaga from '../reducers/trip/tripSaga'
import customSaga from '../reducers/custom/customSaga'

export default function* sagas() {
  yield [
    ...authSaga,
    ...tripSaga,
    ...customSaga,
  ]
}
