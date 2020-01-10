import { combineReducers } from 'redux'
import watsonSession from '../modules/WatsonSession/reducer'
import watson from '../modules/Watson/reducer'
import auth from '../modules/Authenticate/reducer'

const rootReducer = combineReducers({
    watsonSession,
    watson,
    auth
})

export default rootReducer