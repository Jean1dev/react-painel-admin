import { combineReducers } from 'redux'
import watsonSession from '../modules/WatsonSession/reducer'
import watson from '../modules/Watson/reducer'
import authenticate from '../modules/Authenticate/reducer'
import persistReducers from './persistReducer'

const auth = persistReducers(authenticate)

export default function handleReducers() {
    return combineReducers({
        auth,
        watsonSession,
        watson
    })
}