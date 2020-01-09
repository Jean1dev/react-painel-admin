import { combineReducers } from 'redux'
import session from '../modules/Session/reducer'

const rootReducer = combineReducers({
    session,
})

export default rootReducer