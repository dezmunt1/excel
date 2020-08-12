
export class TableSelection {
  constructor() {
    this.group = []
    this.current = null
  }
  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    this.current
        .focus()
        .addClass('selected')
  }

  selectGroup($group) {
    this.clear()
    this.group = $group
    this.group.forEach( $cell => $cell.addClass('selected'))
  }

  get selectedIds() {
    return this.group.map( $el => $el.id())
  }

  clear() {
    this.group.forEach( cell => cell.removeClass( 'selected' ) )
    this.group = []
  }

  applyStyle(style) {
    this.group.forEach(cell => cell.css(style))
  }
}


