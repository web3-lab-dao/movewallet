import { debounce } from 'lodash'
import { alias } from 'webext-redux'
import browser from 'webextension-polyfill'
import { devToolsEnhancer } from '@redux-devtools/remote'
import { configureStore, isPlain, Middleware } from '@reduxjs/toolkit'
import { encodeJSON } from './utils'
import { allAliases } from './redux-slices/utils'
import { REDUX_STATE_VERSION } from './redux-slices/migrations'
import rootReducer from './redux-slices'

// This sanitizer runs on store and action data before serializing for remote
// redux devtools. The goal is to end up with an object that is directly
// JSON-serializable and deserializable; the remote end will display the
// resulting objects without additional processing or decoding logic.
const devToolsSanitizer = (input: unknown): any => {
  switch (typeof input) {
    // We can make use of encodeJSON instead of recursively looping through
    // the input
    case 'bigint':
    case 'object':
      return JSON.parse(encodeJSON(input))
    default:
      return input
  }
}

const persistStoreFn = <T>(state: T): void => {
  if (process.env.WRITE_REDUX_CACHE === 'true') {
    // Browser extension storage supports JSON natively, despite that we have
    // to stringify to preserve BigInts
    browser.storage.local.set({
      state: encodeJSON(state),
      version: REDUX_STATE_VERSION
    })
  }
}

const persistStoreState = debounce(persistStoreFn, 50, {
  trailing: true,
  maxWait: 50
})

const reduxCache: Middleware = (store) => (next) => (action) => {
  const result = next(action)
  const state = store.getState()

  persistStoreState(state)

  return result
}

export const initializeStore = (preloadedState = {}, main: any) => configureStore({
  preloadedState,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        isSerializable: (value: unknown) => isPlain(value) || typeof value === 'bigint'
      },
      thunk: { extraArgument: { main } }
    })

    // It might be tempting to use an array with `...` destructuring, but
    // unfortunately this fails to preserve important type information from
    // `getDefaultMiddleware`. `push` and `pull` preserve the type
    // information in `getDefaultMiddleware`, including adjustments to the
    // dispatch function type, but as a tradeoff nothing added this way can
    // further modify the type signature. For now, that's fine, as these
    // middlewares don't change acceptable dispatch types.
    //
    // Process aliases before all other middleware, and cache the redux store
    // after all middleware gets a chance to run.
    middleware.unshift(alias(allAliases))
    middleware.push(reduxCache)

    return middleware
  },
  devTools: false,
  enhancers:
    process.env.NODE_ENV === 'development'
      ? [
        devToolsEnhancer({
          hostname: 'localhost',
          port: 8000,
          realtime: true,
          actionSanitizer: devToolsSanitizer,
          stateSanitizer: devToolsSanitizer
        })
      ]
      : []
})

export type ReduxStoreType = ReturnType<typeof initializeStore>
