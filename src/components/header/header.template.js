export function createHeader(state) {
  return `
    <input class="input" type="text" value="${state.tableName}"></input>
    <div>
      <div class="button">
        <span class="material-icons">
          exit_to_app
        </span>
      </div>
      <div class="button">
        <span class="material-icons">
          delete
        </span>
      </div>
    </div>
    `
}
