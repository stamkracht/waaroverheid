import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import municipalities from './municipalities'
import map from './map'

export default combineReducers({
  routing: routerReducer,
  municipalities,
  map
})
