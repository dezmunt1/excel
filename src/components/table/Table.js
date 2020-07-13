import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {tableResize} from '@/components/table/table.resize'
import {isCell, shouldResize,
  getMatrix, nextSelector} from '@/components/table/table.helpers'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable()
  }
  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    this.$emit('table:edit', $cell.text)

    this.$on('formula:input', text => {
      this.selection.current.text = text
    })
    this.$on('formula:enter', () => {
      this.selection.current.focus()
    })
  }


  onMousedown(event) {
    if ( shouldResize(event) ) {
      tableResize(this.$root, event)
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
      this.$emit('table:edit', this.selection.current.text)
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
      }
    }
  }
  onInput() {
    const text = this.selection.current.text
    this.$emit('table:edit', text)
  }
}

