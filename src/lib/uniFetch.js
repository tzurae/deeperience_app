import { auth as Config } from '../config'
import { appAuthToken } from '../reducers/auth/authToken'
const DOMAIN = Config.mongodb.domain

export default ({ domain, path, method, body, token }) =>
  fetch(domain || `${DOMAIN}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: `token=${appAuthToken.token}`,
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : null,
  }).then(res => res.json())
