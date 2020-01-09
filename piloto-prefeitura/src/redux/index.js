import { persistStore } from 'redux-persist'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import persistReducer from './persistReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = [ thunk ]

const store = createStore(
    persistReducer(reducers),
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
)

const persistor = persistStore(store)

export { store, persistor }