import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {tableResize} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.helpers'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove']
    });
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if ( shouldResize(event) ) {
      tableResize(this.$root, event)
    }
  }
  onMousemove(event) {
    // console.log(event.offsetX)
  }
}
