import {toInlineStyles} from '@core/utils'
import {DEFAULT_STYLES} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function createCell(row, state) {
  return function createCell( {index: col, width} ) {
    const id = `${row}:${col}`
    const styles = toInlineStyles({...DEFAULT_STYLES, ...state.stylesState[id]})
    return `
    <div
      class="cell"
      style="${styles}; width: ${width}"
      contenteditable
      data-type="resizable"
      data-target="cell"
      data-col="${col}"
      data-id=${id}
      data-value=${state.dataState[id] || ''}
    >
    ${parse(state.dataState[id]) || ''}
    </div>
  `
  }
}

function createCol( {content, index: col, width} ) {
  return `
    <div
      class="column"
      style="width: ${width}"
      data-type="resizable"
      data-col=${col}
     >
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow( count, content, state ) {
  const resizer = count
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
    <div
      class="row"
      data-type="resizable"
      data-row="${count}"
      style="height: ${getHeight(count, state)}"
     >
      <div class="row-info">
        ${count ? count : ''}
        ${resizer}
       </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function getWidth(index, state = {}) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}
function getHeight(index, state = {}) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}
function colWidthWithState(state) {
  return function(content, index) {
    return {
      content, index, width: getWidth(index, state)
    }
  }
}

export function createTable(rowCount = 100, getState) {
  const state = {
    row: getState('rowState'),
    col: getState('colState'),
    state: getState()
  }
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map( (el, index) => String.fromCharCode(CODES.A + index) )
      .map( colWidthWithState(state.col) )
      .map(createCol)
      .join('')

  rows.push(createRow( null, cols))

  for (let row = 0; row < rowCount; row++) {
    const cols = new Array(colsCount)
        .fill('')
        .map( colWidthWithState(state.col) )
        .map( createCell(row, state.state) )
        .join('')
    rows.push(createRow( row + 1, cols, state.row))
  }

  return rows.join('')
}
