import {createHeader} from './header.template'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'

export class Header extends ExcelStateComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['focusout'],
      subscribe: ['tableName'],
      ...options
    })
  }

  prepare() {
    this.initState({
      tableName: this.store.getState('tableName')
    })
  }

  get template() {
    return createHeader(this.state)
  }

  storeChanged(changes) {
    this.setState(changes)
  }

  toHTML() {
    return this.template
  }

  onFocusout(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }
}
