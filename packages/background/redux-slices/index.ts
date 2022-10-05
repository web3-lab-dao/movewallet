import { combineReducers } from 'redux'

// import uiReducer from './ui'
import counterReducer from './counter'

const mainReducer = combineReducers({
  // ui: uiReducer,
  counter: counterReducer
})

export type RootState = ReturnType<typeof mainReducer>

export default mainReducer
