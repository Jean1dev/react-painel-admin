import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Routes from './routes'
import { Router } from 'react-router-dom'
import { store, persistor } from './redux'
import history from './service/history'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
