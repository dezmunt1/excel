import {storage} from '@core/utils'

function toHTML(key) {
  const tableData = storage(key)
  const id = key.split(':')[1]

  return `
    <li class="db__record">
      <a href="#excel/${id}">${tableData.tableName}</a>
      <strong>
        ${new Date(tableData.openedDate).toLocaleDateString()}
        ${new Date(tableData.openedDate).toLocaleTimeString()}
      </strong>
    </li>`
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if ( !key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if ( !keys.length ) {
    return `<p>Документы ещё не созданы!</p>`
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата Открытия</span>
    </div>

    <ul class="db__list">
      ${ keys.map(toHTML).join('') }
    </ul>
  `
}
