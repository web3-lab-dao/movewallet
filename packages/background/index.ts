import browser from 'webextension-polyfill'
import { AnyAction } from '@reduxjs/toolkit'
import { Store as ProxyStore } from 'webext-redux'
// @ts-ignore
import Main from './main'
import { RootState } from './redux-slices'
import { patchDeepDiff } from './redux-slices/utils'
import { encodeJSON, decodeJSON } from './utils'

export { browser }
export type { RootState }
export type BackgroundDispatch = Main['store']['dispatch']

/**
 * Creates and returns a new webext-redux proxy store. This is a redux store
 * that works like any redux store, except that its contents and actions are
 * proxied to and from the master background store created when the API package
 * is first imported.
 *
 * The returned Promise resolves once the proxy store is ready and hydrated
 * with the current background store data.
 */
export async function newProxyStore(): Promise<ProxyStore<RootState, AnyAction>> {
  const proxyStore = new ProxyStore({
    serializer: encodeJSON,
    deserializer: decodeJSON,
    patchStrategy: patchDeepDiff
  })

  await proxyStore.ready()

  return proxyStore
}

/**
 * Starts the API subsystems, including all services.
 */
export async function startMain(): Promise<Main> {
  const mainService = await Main.create()

  await mainService.startService()

  return mainService.started()
}
