/**
 * # authReducer-test.js
 *
 * Test the authReducer's only function, like all reducers, where the
 * state and action are passed in.
 *
 * This will confirm that given a specific action with a type and
 * payload, that the state object is modified accordingly.
 *
 * *Note*: in this app,```state``` is an Immutable.js object
 *
 */
'use strict'

import authReducer from '../authReducer'

const {
  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  TOGGLE_REGISTER_CHECKED,

  RESET_FORM,

  SET_STATE,
} = require('../../../lib/constants').default

/**
 * ## Class under test
 *
 * Note that since autoMockOff has been called, we will get the actual
 * formValidation and fieldValidation objects, so we're testing them
 * as well
 */

describe('authReducer', () => {
  describe('SIGNUP_REQUEST', () => {
    it('Finish fetching with error', () => {
      const action = {
        type: SIGNUP_REQUEST,
      }
      const next = authReducer(undefined, action)

      expect(next.form.isFetching).toBe(true)
      expect(next.form.error).toBeNull()
    })
  })

  describe('LOGOUT_REQUEST', () => {
    it('Finish fetching with error', () => {
      const action = {
        type: LOGOUT_REQUEST,
      }
      const next = authReducer(undefined, action)

      expect(next.form.isFetching).toBe(true)
      expect(next.form.error).toBeNull()
    })
  })

  describe('LOGIN_REQUEST', () => {
    it('Finish fetching with error', () => {
      const action = {
        type: LOGIN_REQUEST,
      }
      const next = authReducer(undefined, action)

      expect(next.form.isFetching).toBe(true)
      expect(next.form.error).toBeNull()
    })
  })

  describe('RESET_PASSWORD_REQUEST', () => {
    it('Finish fetching with error', () => {
      const action = {
        type: RESET_PASSWORD_REQUEST,
      }
      const next = authReducer(undefined, action)

      expect(next.form.isFetching).toBe(true)
      expect(next.form.error).toBeNull()
    })
  })

  describe('LOGOUT', () => {
    /**
     * ### Get initial state
     *
     */
    let initialState = null
    beforeEach(() => {
      const action = {
        type: 'dummy',
      }
      initialState = authReducer(undefined, action)
    })
    /**
     * #### form is valid to logout
     *
     * Should have a valid form and in the Logged out state
     */
    it('form is valid to logout', () => {
      const action = {
        type: LOGOUT,
      }
      const next = authReducer(initialState, action)

      expect(next.form.state).toBe(LOGOUT)
    })
    /**
     * #### form is valid to logout even with form fields
     *
     * Even if the form were to have some data, once they log out that
     * form should be cleared, valid and in the Logged out state
     *
     */
    it('form is valid to logout even with form fields', () => {
      const action = {
        type: LOGOUT,
      }
      const withFields = initialState.setIn(['form', 'fields', 'username'], 'dummy')
          .setIn(['form', 'fields', 'email'], 'notvalid')
          .setIn(['form', 'fields', 'password'], 'foo')
          .setIn(['form', 'fields', 'passwordAgain'], 'foo')
      const next = authReducer(withFields, action)
      expect(next.form.state).toBe(LOGOUT)
      expect(next.form.error).toBeNull()
      expect(next.form.fields.username).toBe('')
      expect(next.form.fields.email).toBe('')
      expect(next.form.fields.password).toBe('')
      expect(next.form.fields.passwordAgain).toBe('')
    })
  })

  describe('LOGIN', () => {
    let initialState = null
    /**
     * #### Get a valid state
     *
     */
    beforeEach(() => {
      const action = {
        type: 'dummy',
      }
      initialState = authReducer(undefined, action)
    })
    /**
     * #### form is not valid with empty fields
     *
     * empty fields are not allowed
     */
    it('form is not valid with empty fields', () => {
      const action = {
        type: LOGIN,
      }
      const next = authReducer(initialState, action)

      expect(next.form.state).toBe(LOGIN)
      expect(next.form.isValid).toBe(false)
    })
    /**
     * #### form is  valid with valid fields
     *
     * provide valid input and the form should be valid
     */
    it('form is valid with valid fields', () => {
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'barton@x.com' },
      }
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'password', value: 'Bart0nasd' },
      }

      const userNameState = authReducer(initialState,
        emailFieldChangeAction)
      const passwordState = authReducer(userNameState,
        passwordFieldChangeAction)

      const action = {
        type: LOGIN,
      }

      const next = authReducer(passwordState, action)
      expect(next.form.state).toBe(LOGIN)
      expect(next.form.fields.usernameHasError).toBe(false)
      expect(next.form.fields.passwordHasError).toBe(false)
      expect(next.form.isValid).toBe(true)
    })
    /**
     * #### form is invalid with invalid fields
     *
     * If the fields are invalid, the fieldValidation and
     * formValidation will flag as such
     */

    it('form is invalid with invalid', () => {
      const userNameFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'username', value: 'bart' },
      }
      const userNameState = authReducer(initialState,
        userNameFieldChangeAction)

      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'password', value: 'Bart!' },
      }

      const passwordState = authReducer(userNameState,
        passwordFieldChangeAction)

      const action = {
        type: LOGIN,
      }

      const next = authReducer(passwordState, action)
      expect(next.form.state).toBe(LOGIN)
      expect(next.form.fields.usernameHasError).toBe(true)
      expect(next.form.fields.passwordHasError).toBe(true)
      expect(next.form.isValid).toBe(false)
    })
  })
  describe('REGISTER', () => {
    let initialState = null
    /**
     * #### Get a valid state
     *
     */
    beforeEach(() => {
      const action = {
        type: 'dummy',
      }
      initialState = authReducer(undefined, action)
    })
    /**
     * #### form is not valid with empty fields
     *
     * no data, not valid
     */
    it('form is not valid with empty fields', () => {
      const action = {
        type: REGISTER,
      }
      const next = authReducer(initialState, action)

      expect(next.form.state).toBe(REGISTER)
      expect(next.form.isValid).toBe(false)
    })
    /**
     * #### form is  valid with valid fields
     *
     * The registration UI requires 4 valid fields before the form is
     * considered valid.
     *
     * Provide valid input and get a valid form
     */
    it('form is valid with valid fields', () => {
      const userNameFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'username', value: 'barton' },
      }
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'bar@ton.com' },
      }
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'password', value: 'Bart0naa' },
      }
      const passwordAgainFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'passwordAgain', value: 'Bart0naa' },
      }

      const userNameState = authReducer(initialState,
        userNameFieldChangeAction)
      const emailState = authReducer(userNameState,
        emailFieldChangeAction)
      const passwordState = authReducer(emailState,
        passwordFieldChangeAction)
      const passwordAgainState = authReducer(passwordState,
        passwordAgainFieldChangeAction)

      const action = {
        type: REGISTER,
      }

      const next = authReducer(passwordAgainState, action)
      expect(next.form.state).toBe(REGISTER)
      expect(next.form.fields.usernameHasError).toBe(false)
      expect(next.form.fields.emailHasError).toBe(false)
      expect(next.form.fields.passwordHasError).toBe(false)
      expect(next.form.fields.passwordAgainHasError).toBe(false)
      expect(next.form.isValid).toBe(true)
    })
    /**
     * #### form is  invalid with invalid field
     *
     * Bad data in, invalid form out!
     */
    it('form is invalid with invalid fields', () => {
      const userNameFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'username', value: 'bart' },
      }
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'barton' },
      }
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'password', value: 'Bart!' },
      }
      const passwordAgainFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'passwordAgain', value: 'Ba!' },
      }

      const userNameState = authReducer(initialState,
        userNameFieldChangeAction)
      const emailState = authReducer(userNameState,
        emailFieldChangeAction)
      const passwordState = authReducer(emailState,
        passwordFieldChangeAction)
      const passwordAgainState = authReducer(passwordState,
        passwordAgainFieldChangeAction)

      const action = {
        type: REGISTER,
      }

      const next = authReducer(passwordAgainState, action)
      expect(next.form.state).toBe(REGISTER)
      expect(next.form.fields.usernameHasError).toBe(true)
      expect(next.form.fields.emailHasError).toBe(true)
      expect(next.form.fields.passwordHasError).toBe(true)
      expect(next.form.fields.passwordAgainHasError).toBe(true)
      expect(next.form.isValid).toBe(false)
    })
  })

  /**
   * ### The user wants to reset their password
   *
   */
  describe('FORGOT_PASSWORD', () => {
    let initialState = null
    /**
     * #### before each
     *
     * get a valid initial state
     */
    beforeEach(() => {
      const action = {
        type: 'dummy',
      }
      initialState = authReducer(undefined, action)
    })
    /**
     * #### form is not valid with empty field
     *
     * A value is required
     *
     */
    it('form is not valid with empty field', () => {
      const action = {
        type: FORGOT_PASSWORD,
      }
      const next = authReducer(initialState, action)

      expect(next.form.state).toBe(FORGOT_PASSWORD)
      expect(next.form.isValid).toBe(false)
    })
    /**
     * #### form is valid with valid email
     *
     * Verify a valid email address, one that passes the
     * fieldValidation rule, should show the form as valid
     *
     */
    it('form is valid with valid email', () => {
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'bar@ton.com' },
      }
      const emailState = authReducer(initialState,
                                   emailFieldChangeAction)

      const action = {
        type: FORGOT_PASSWORD,
      }
      const next = authReducer(emailState,
                             action)
      expect(next.form.state).toBe(FORGOT_PASSWORD)
      expect(next.form.isValid).toBe(true)
    })
    /**
     * #### form is invalid with invalid email
     *
     * The email field should be a valid email address with respect to
     * the format, but under no circumstances should the user receive
     * feedback that the email address exists within the app
     */
    it('form is invalid with invalid email', () => {
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'bar@ton' },
      }
      const emailState = authReducer(initialState,
                                   emailFieldChangeAction)

      const action = {
        type: FORGOT_PASSWORD,
      }
      const next = authReducer(emailState,
                             action)
      expect(next.form.state).toBe(FORGOT_PASSWORD)
      expect(next.form.isValid).toBe(false)
    })
  })

  describe('SIGNUP_FAILURE', () => {
    it('Finish fetching with error', () => {
      const action = {
        type: SIGNUP_FAILURE,
        payload: { error: 'error' },
      }
      const next = authReducer(undefined, action)

      expect(next.form.isFetching).toBe(false)
      expect(next.form.error).toBeDefined()
      expect(next.form.error.error).toBe('error')
    })
  })

  describe('test the validity of field', () => {
    let initialState = null
    beforeEach(() => {
      const action = {
        type: 'dummy',
      }
      initialState = authReducer(undefined, action)
    })
    /**
     * ### Test different kinds of username pattern
     * usernamePattern = /^[a-zA-Z0-9]{6,15}$/
     */
    it('username', () => {
      const errorPattern = [
        'bart', 'bart1', 'bartasd!', '123123asdasdasdasdasd3',
      ]

      const correctPattern = [
        '123123', '1sss123123',
      ]

      errorPattern.forEach((value) => {
        const next = authReducer(initialState, {
          type: ON_AUTH_FORM_FIELD_CHANGE,
          payload: { field: 'username', value },
        })
        expect(next.form.fields.usernameHasError).toBe(true)
      })

      correctPattern.forEach((value) => {
        const next = authReducer(initialState, {
          type: ON_AUTH_FORM_FIELD_CHANGE,
          payload: { field: 'username', value },
        })
        expect(next.form.fields.usernameHasError).toBe(false)
      })
    })
    /**
     * ### Test different kinds of password pattern
     * /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$/
     */
    it('password', () => {
      const errorPattern = [
        'bart', '12312', '23121321', 'asdasddasd', 'bartasdasdasdasdasd222222222',
        'barta!!d3', 'asd2323@', '#asdad33', '^sadad21', '%asda111',
      ]

      const correctPattern = [
        '1231sss23', '1sss123',
      ]

      errorPattern.forEach((value) => {
        const next = authReducer(initialState, {
          type: ON_AUTH_FORM_FIELD_CHANGE,
          payload: { field: 'password', value },
        })
        expect(next.form.fields.passwordHasError).toBe(true)
      })

      correctPattern.forEach((value) => {
        const next = authReducer(initialState, {
          type: ON_AUTH_FORM_FIELD_CHANGE,
          payload: { field: 'password', value },
        })
        expect(next.form.fields.passwordHasError).toBe(false)
      })
    })
    /**
     * ### Test different kinds of email pattern
     *
     */
    it('email', () => {
      const errorPattern = [
        'bart', 'asdasddasd',
        'barta!!d3', 'asd2323@', '#asdad33', '^sadad21', '%asda111',
        'asdasd@asdasd',
      ]

      const correctPattern = [
        '123@g.com', 'a@yahoo.com.tw',
      ]

      errorPattern.forEach((value) => {
        const next = authReducer(initialState, {
          type: ON_AUTH_FORM_FIELD_CHANGE,
          payload: { field: 'email', value },
        })
        expect(next.form.fields.emailHasError).toBe(true)
      })

      correctPattern.forEach((value) => {
        const next = authReducer(initialState, {
          type: ON_AUTH_FORM_FIELD_CHANGE,
          payload: { field: 'email', value },
        })
        expect(next.form.fields.emailHasError).toBe(false)
      })
    })
  })
})
