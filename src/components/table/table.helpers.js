import {range} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.target === 'cell'
}

export function getMatrix( currentElem, targetElem ) {
  const cols = range( currentElem.col, targetElem.col )
  const rows = range( currentElem.row, targetElem.row )
  const ids = rows.reduce( (acc, row) => {
    cols.forEach( col => acc.push(`${row}:${col}`))
    return acc
  }, [] )
  return ids
}

export function nextSelector(key, {row, col}) {
  if ( key === 'ArrowUp'|| key === 'ArrowDown' || key === 'Enter' ) {
    const id = key === 'ArrowUp'
      ? `${row - 1}:${col}`
      : `${row + 1}:${col}`
    return `[data-id="${id}"]`
  }
  const id = `${row}:${key === 'ArrowLeft' ? col - 1 : col + 1}`
  return `[data-id="${id}"]`
}
