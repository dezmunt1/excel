import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()
    this.formula = this.$root.find('.input')
    this.$on('table:edit', text => {
      this.formula.text = text
    })
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:enter')
    }
  }
  onInput(event) {
    this.$emit('formula:input', $(event.target).text)
  }
}
