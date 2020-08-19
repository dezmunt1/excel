import {DEFAULT_STYLES, DEFAULT_TABLE_NAME} from '@/constants'
import {clone} from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  tableName: DEFAULT_TABLE_NAME,
  currentStyles: DEFAULT_STYLES,
  openedDate: new Date().toJSON()
}
const normalize = state => ({
  ...state,
  currentStyles: DEFAULT_STYLES,
  currentText: ''
})
export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
