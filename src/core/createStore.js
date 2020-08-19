export function createStore(rootReducer, initialState) {
  // eslint-disable-next-line no-debugger
  debugger
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []
  return {
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach( l => l(state))
    },
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter( l => l !== fn)
        }
      }
    },
    getState() {
      return state
    }
  }
}

// class implementation

export class CreateStore {
  constructor(rootReducer, initialState) {
    this.rootReducer = rootReducer
    this.state = this.rootReducer({...initialState}, {type: '__INIT__'})
    this.listeners = []
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach( l => l(this.state))
  }

  subscribe(fn) {
    this.listeners.push(fn)
    const unsubscribe = () => {
      this.listeners = this.listeners.filter( l => l !== fn)
    }
    return {
      unsubscribe
    }
  }

  getState(stateName) {
    if (stateName) {
      return JSON.parse(JSON.stringify(this.state[stateName] || {}))
    }
    return JSON.parse(JSON.stringify(this.state))
  }
}
