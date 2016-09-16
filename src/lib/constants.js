import keyMirror from 'key-mirror'

export default keyMirror({

  SET_PLATFORM: null,
  SET_VERSION: null,

  ON_LOGIN_STATE_CHANGE: null,
  ON_AUTH_FORM_FIELD_CHANGE: null,

  INIT_AUTH: null,

  SIGNUP_START: null,
  SIGNUP_REQUEST: null,
  SIGNUP_SUCCESS: null,
  SIGNUP_FAILURE: null,

  //LOGOUT, REGISTER, LOGIN just status of view
  //for example , when you send LOGOUT action
  //the form's state that user input will be diminished.
  LOGOUT: null,
  REGISTER: null,
  LOGIN: null,

  LOGIN_START:null,
  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,
  LOGIN_SOCIAL: null,

  LOGOUT_START: null,
  LOGOUT_REQUEST: null,
  LOGOUT_SUCCESS: null,
  LOGOUT_FAILURE: null,

  LOGGED_IN: null,
  LOGGED_OUT: null,

  RESET_PASSWORD_START: null,
  RESET_PASSWORD_REQUEST: null,
  RESET_PASSWORD_SUCCESS: null,
  RESET_PASSWORD_FAILURE: null,

  GET_PROFILE_REQUEST: null,
  GET_PROFILE_SUCCESS: null,
  GET_PROFILE_FAILURE: null,

  ON_PROFILE_FORM_FIELD_CHANGE: null,

  PROFILE_UPDATE_REQUEST: null,
  PROFILE_UPDATE_SUCCESS: null,
  PROFILE_UPDATE_FAILURE: null,

  SET_STATE: null,
  GET_STATE: null,
  SET_STORE: null,

  // LoginForm.js
  FORGOT_PASSWORD: null,

  GET_ALL_TRIP: null,
  GET_TRIP_BY_CLASS: null,
  GET_TRIP_CONTENT: null,
  GET_TRIP_CONTENT_SUCCESS: null,
  GET_TRIP_CONTENT_FAILURE: null,
})
