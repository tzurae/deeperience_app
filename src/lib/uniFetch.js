import { auth as Config } from '../config'
const DOMAIN = Config.mongodb.domain

export default ({ path, method, body }) =>
  fetch(`${DOMAIN}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,

  }).then(res => res.json())
