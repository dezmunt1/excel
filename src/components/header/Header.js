import {createHeader} from './header.template'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {delStorage} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelStateComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['focusout', 'click'],
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

  onClick(event) {
    const $target = $(event.target)
    const tablePath = this.store.getState('tablePath')
    if ($target.data.type === 'button') {
      actionHandler($target.data.actions, tablePath)
    }
  }
}

function actionHandler(action, tablePath) {
  if (!action) {
    return undefined
  }
  ActiveRoute.navigate('/')
  if (action === 'delete') {
    const confirmation = confirm('Подтвердите удаление таблицы')
    if (confirmation) {
      delStorage(tablePath)
    }
  }
}
