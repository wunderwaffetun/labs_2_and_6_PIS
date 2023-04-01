import { configureStore, getDefaultMiddleware, MiddlewareAPI } from '@reduxjs/toolkit'
import data from './reducer'
import type { Middleware } from '@reduxjs/toolkit'

//global state difination as store

const visibleMiddware: Middleware = (api: MiddlewareAPI) => (next) => (action) => { // Пустой middleware
  return next( action )
}

const logger: Middleware = (api: MiddlewareAPI) => next => action => { //info about state action call
  // console.group(action.type)
  // console.info('dispatching', action)
  // console.log('next state', store.getState())
  return next(action)
}

export const store = configureStore({ // Инициализация стора
  reducer: {
    'global': data
  },

  middleware: getDefaultMiddleware => 
  [logger, visibleMiddware, ...getDefaultMiddleware()]  
})