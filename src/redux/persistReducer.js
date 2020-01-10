import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export default reducers => {
    const persisted = persistReducer({
        key: 'if-tech',
        storage,
    },
        reducers
    )

    return persisted
}