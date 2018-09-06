import { applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from '../Redux'
import rootSaga from '../Sagas'
import Reactotron from '../ReactotronConfig'

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({ collapsed: true })

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = Reactotron.createStore(persistedReducer, applyMiddleware(
  sagaMiddleware,
  logger
))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
