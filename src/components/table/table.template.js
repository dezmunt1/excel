const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `
    <div class="cell" contenteditable>2</div>
  `
}

function createCol( content ) {
  return `
    <div class="column">${content}</div>
  `
}

function createRow( count, content ) {
  return `
    <div class="row">
      <div class="row-info">${count ? count : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable(rowCount = 100) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map( (el, index) => String.fromCharCode(CODES.A + index) )
      .map( el => createCol(el))
      .join('')

  rows.push(createRow( null, cols))

  for (let i = 0; i < rowCount; i++) {
    const cols = new Array(colsCount)
        .fill('')
        .map( (el, index) => createCell() )
        .join('')
    rows.push(createRow( i + 1, cols))
  }

  return rows.join('')
}
