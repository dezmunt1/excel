import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {createTable} from '@/components/table/table.template'
import {tableResize} from '@/components/table/table.resize'
import {isCell, shouldResize,
  getMatrix, nextSelector} from '@/components/table/table.helpers'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {DEFAULT_STYLES} from '@/constants'
import {parse} from '@core/parse'

export class Table extends ExcelStateComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  toHTML() {
    return createTable(20, this.$getState.bind(this))
  }
  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.selection.select($cell)
    this.$emit('table:select', $cell)

    this.$on('formula:input', text => {
      this.selection.current
          .attr('data-value', text[0])
          .text(parse(text[0]))
      this.changeTextInStore(text[0])
    })
    this.$on('formula:enter', () => {
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', ([style]) => {
      this.selection.applyStyle(style)
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.selection.selectedIds
      }))
    })
  }

  storeChanged(changes) {
  }

  async resizeTable(event) {
    try {
      const data = await tableResize(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn(e.message)
    }
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES))
    this.$dispatch(actions.changeStyles(styles))
  }

  onMousedown(event) {
    if ( shouldResize(event) ) {
      this.resizeTable(event)
    } else if ( isCell(event) ) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const currentElem = this.selection.current.id(true)
        const targetElem = $target.id(true)
        const ids = getMatrix( currentElem, targetElem )
        const $cells = ids.map( id => this.$root.find(`[data-id="${id}"]`))
        return this.selection.selectGroup($cells)
      }
      this.selection.select($(event.target))
      this.selectCell($(event.target))
    }
  }

  onKeydown(event) {
    const keys = [
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Enter',
      'ArrowUp',
      'ArrowDown',
    ]
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find( nextSelector(key, id) )
      if ($next.$el) {
        this.selection.select($next)
        this.$emit('table:edit', $next.text)
        this.selectCell($next)
      }
    }
  }

  changeTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput() {
    // this.$emit('table:edit', text)
    this.changeTextInStore(this.selection.current.text())
  }
}

