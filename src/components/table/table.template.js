const CODES = {
  A: 65,
  Z: 90
}

function createCell(row) {
  return function createCell( _, col ) {
    // const resizer = '<div class="col-resize" data-resize="col"></div>'
    return `
    <div
      class="cell"
      contenteditable
      data-type="resizable"
      data-target="cell"
      data-col="${col}"
      data-id="${row}:${col}"
    >
    </div>
  `
  }
}

function createCol( content, col ) {
  return `
    <div class="column" data-type="resizable" data-col=${col}>
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow( count, content ) {
  const resizer = count
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${count ? count : ''}
        ${resizer}
       </div>
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
      .map( createCol )
      .join('')

  rows.push(createRow( null, cols))

  for (let row = 0; row < rowCount; row++) {
    const cols = new Array(colsCount)
        .fill('')
        .map( createCell(row) )
        .join('')
    rows.push(createRow( row + 1, cols))
  }

  return rows.join('')
}
