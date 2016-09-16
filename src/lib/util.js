'use strict'

/*
  for promise iteration
  condition: function , when to stop iterating
  action: function, do promise stuff, like fetching data
  index: number, the iteration index
  sucCallback: function, when everything is all done
  errCallback: function, error callback
  data: initial data and data to add and later dispatch or something

 */
export function promiseFor(condition, action, index, sucCallback, errCallback, data) {
  const promiseForInner = (condition, action, index, data) => {
    if (!condition(index)) {
      sucCallback(data)
    } else {
      return action(index, data)
        .then((data) => {
          promiseForInner(condition,
            action,
            index + 1,
            data)
        })
        .catch((err) => errCallback(err))
    }
  }
  return promiseForInner(condition, action, index, data)
}
