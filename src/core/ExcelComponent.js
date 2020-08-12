import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    this.store = options.store
    this.storeSub = null

    this.prepare()
  }

  prepare() { }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $getState(state) {
    return this.store.getState(state)
  }

  $emit(event, ...args) {
    this.emitter.emit(event, args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  toHTML() {
    return '';
  }

  storeChanged(changes) {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initDOMListeners()
  }
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach( unsub => unsub() )
  }
}

