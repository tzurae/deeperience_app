export type Action =
  { type: 'SET_PLATFORM', payload: string } |
    { type: 'SET_VERSION', payload: string } |

    { type: 'LOGOUT'} |
    { type: 'ON_AUTH_FORM_FIELD_CHANGE', payload: {field:string, value:string} } |
    { type: 'SIGNUP_REQUEST'} |
    { type: 'SIGNUP_SUCCESS', payload: any} |
    { type: 'SIGNUP_FAILURE', payload: any} |

    { type: 'LOGIN_REQUEST'} |
    { type: 'LOGIN_SUCCESS', payload: any} |
    { type: 'LOGIN_FAILURE', payload: any} |
    { type: 'LOGIN_SOCIAL', payload: {authProvider:any} } |

    { type: 'LOGOUT_REQUEST'} |
    { type: 'LOGOUT_SUCCESS'} |
    { type: 'LOGOUT_FAILURE', payload: any} |

    { type: 'RESET_PASSWORD_REQUEST'} |
    { type: 'RESET_PASSWORD_SUCCESS'} |
    { type: 'RESET_PASSWORD_FAILURE', payload: any} |

    { type: 'GET_PROFILE_REQUEST'} |
    { type: 'GET_PROFILE_SUCCESS', payload: any} |
    { type: 'GET_PROFILE_FAILURE', payload: any} |

    { type: 'PROFILE_UPDATE_REQUEST'} |
    { type: 'PROFILE_UPDATE_SUCCESS'} |
    { type: 'PROFILE_UPDATE_FAILURE', payload: any} |

    { type: 'ON_PROFILE_FORM_FIELD_CHANGE', payload: {field:string, value:string} } |

    { type: 'SET_STATE', payload: any} |
    { type: 'GET_STATE', payload: any} |
    { type: 'SET_STORE', payload: any} |

    { type: 'FORGOT_PASSWORD'} |
    { type: 'LOGIN'} |
    { type: 'REGISTER'}

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
