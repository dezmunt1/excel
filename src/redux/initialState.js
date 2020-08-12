import {storage} from '@core/utils'
import {DEFAULT_STYLES, DEFAULT_TABLE_NAME} from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  tableName: DEFAULT_TABLE_NAME,
  currentStyles: DEFAULT_STYLES,
}

const normalize = state => ({
  ...state,
  currentStyles: DEFAULT_STYLES,
  currentText: ''
})

export const initialState = storage('exel-state')
  ? normalize(storage('exel-state'))
  : defaultState
