import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import municipalities from './municipalities'

export default combineReducers({
  routing: routerReducer,
  municipalities
})
