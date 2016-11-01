import authSaga from '../reducers/auth/authSaga'
import tripSaga from '../reducers/trip/tripSaga'
import mainSaga from '../reducers/main/mainSaga'
import customSaga from '../reducers/custom/customSaga'

export default function* sagas() {
  yield [
    ...authSaga,
    ...tripSaga,
    ...mainSaga,
    ...customSaga,
  ]
}
