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
    { type: 'REGISTER'} |

    { type: 'GET_ALL_TRIP'} |
    { type: 'GET_TRIP_BY_CLASS'} |
    { type: 'GET_TRIP_CONTENT', payload:{tripId: string}} |
    { type: 'GET_TRIP_CONTENT_SUCCESS', payload: any} |
    { type: 'GET_TRIP_CONTENT_FAILURE', payload: any} |
    { type: 'SET_SITE_CONTENT_SUCCESS', payload: any} |
    { type: 'SET_SITE_CONTENT_FAILURE', payload: any} |

    { type: 'ACTIVATE_SITE_BUTTON', payload: any} |
    { type: 'DEACTIVATE_SITE_BUTTON' } |
    { type: 'SET_DISPLAY_INFO', payload: {title:string, introduction:string} } |
    { type: 'CLOSE_DISPLAY_INFO' } |

    { type: 'SET_MAP_INFO', payload: any} |
    { type: 'SET_MAP_DIRECTION', payload: any} |
    { type: 'SET_MAP_DIRECTION_ERROR', payload: any} |

    { type: 'SET_AUDIO_DURATION', payload: number} |
    { type: 'SET_AUDIO_POSITION', payload: number} |
    { type: 'RESET_AUDIO' } |

    { type: 'SET_DISPLAY_INFO_TRANSIT'} |
    { type: 'SET_DISPLAY_INFO_TRANSIT_SUCCESS', payload: any} |
    { type: 'SET_DISPLAY_INFO_TRANSIT_FAILURE', payload: any} |

    { type: 'SWITCH_DISPLAY_INFO_CARD', payload: number}

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
