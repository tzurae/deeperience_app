'use strict'

export function promiseFor(condition, action, index, sucCallback, errCallback, data) {
  const promiseForInner = (condition, action, index) => {
    if (!condition(index)) {
      sucCallback({ data })
    } else {
      return action(index, data)
        .then(promiseForInner(condition,
          action,
          index + 1)
        )
        .catch((err) => errCallback(err))
    }
  }
  return promiseForInner(condition, action, index)
}
