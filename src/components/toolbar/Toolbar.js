import {createToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {DEFAULT_STYLES} from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(DEFAULT_STYLES)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    console.log('kek:', changes)
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      console.log('lol:', value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
