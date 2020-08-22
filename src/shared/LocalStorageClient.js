import {storage} from '../core/utils'

function stateName(param) {
  return `excel:${param}`
}

export class LocalStorageClient {
  constructor(name) {
    this.name = stateName(name)
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return Promise.resolve(storage(this.name))
  }
}
