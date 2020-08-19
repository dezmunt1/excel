export function createHeader(state) {
  const meta = `
    data-type="button"
  `
  const actions = {
    exit: 'data-actions="exit"',
    delete: 'data-actions="delete"'
  }

  return `
    <input class="input" type="text" value="${state.tableName}"></input>
    <div>
      <div class="button" ${meta + actions.exit}>
        <span class="material-icons" ${meta + actions.exit}>
          exit_to_app
        </span>
      </div>
      <div class="button" ${meta + actions.delete}>
        <span class="material-icons" ${meta + actions.delete}>
          delete
        </span>
      </div>
    </div>
    `
}
