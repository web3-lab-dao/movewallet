import { wrapStore } from 'webext-redux'
import browser, { runtime } from 'webextension-polyfill'
import logger from './lib/logger'
import { decodeJSON, encodeJSON } from './utils'
import { deepDiff } from './redux-slices/utils'
import { migrateReduxState } from './redux-slices/migrations'
import { ReduxStoreType, initializeStore } from './store'

import {
  ServiceCreatorFunction,
  BaseService
} from './services'

type ServicesType = {}

export const popupMonitorPortName = 'popup-monitor'

export default class Main extends BaseService<never> {
  /**
   * The redux store for the wallet core. Note that the redux store is used to
   * render the UI (via webext-redux), but it is _not_ the source of truth.
   * Services interact with the various external and internal components and
   * create persisted state, and the redux store is simply a view onto those
   * pieces of canonical state.
   */
  store: ReduxStoreType

  static create: ServiceCreatorFunction<never, Main, []> = async (): Promise<Main> => {
    // const preferenceService = PreferenceService.create()

    let savedReduxState = {}

    // Setting READ_REDUX_CACHE to false will start the extension with an empty
    // initial state, which can be useful for development
    if (process.env.READ_REDUX_CACHE === 'true') {
      const { state, version } = await browser.storage.local.get([
        'state',
        'version'
      ])

      if (state) {
        const restoredState = decodeJSON(state)

        if (typeof restoredState === 'object' && restoredState !== null) {
          // If someone managed to sneak JSON that decodes to typeof "object"
          // but isn't a Record<string, unknown>, there is a very large
          // problem...
          savedReduxState = migrateReduxState(
            restoredState as Record<string, unknown>,
            version || undefined
          )
        } else {
          throw new Error(`Unexpected JSON persisted for state: ${state}`)
        }
      }
    }

    return new this(
      savedReduxState,
      {
        // preferenceService: await preferenceService
      }
    )
  }

  private constructor(
    savedReduxState: Record<string, unknown>,
    private services: ServicesType
  ) {
    super({
      /* initialLoadWaitExpired: {
        schedule: { delayInMinutes: 2.5 },
        handler: () => this.store.dispatch(initializationLoadingTimeHitLimit())
      } */
    })

    // Start up the redux store and set it up for proxying.
    this.store = initializeStore(savedReduxState, this)

    wrapStore(this.store, {
      serializer: encodeJSON,
      deserializer: decodeJSON,
      diffStrategy: deepDiff,
      dispatchResponder: async (
        dispatchResult: Promise<unknown>,
        send: (param: { error: string | null; value: unknown | null }) => void
      ) => {
        try {
          send({
            error: null,
            value: encodeJSON(await dispatchResult)
          })
        } catch (error) {
          logger.error(
            'Error awaiting and dispatching redux store result: ',
            error
          )

          send({
            error: encodeJSON(error),
            value: null
          })
        }
      }
    })

    this.initializeRedux()
  }

  public getService<T extends keyof ServicesType>(service: T) {
    if (!this.services.hasOwnProperty(service)) {
      throw new Error('Service not found')
    }

    return this.services[service]
  }

  protected async internalStartService(): Promise<void> {
    await super.internalStartService()

    const servicesToBeStarted: any = [
      // this.getService('preferenceService').startService()
    ]

    await Promise.all(servicesToBeStarted)
  }

  protected async internalStopService(): Promise<void> {
    const servicesToBeStopped: any = [
      // this.getService('preferenceService').stopService()
    ]

    await Promise.all(servicesToBeStopped)

    await super.internalStopService()
  }

  async initializeRedux(): Promise<void> {
    // this.connectProviderBridgeService()
    // this.connectPreferenceService()
    // this.connectPopupMonitor()
  }

  private connectPopupMonitor(): void {
    runtime.onConnect.addListener((port) => {
      if (port.name !== popupMonitorPortName) return

      port.onDisconnect.addListener(() => {
        this.onPopupDisconnected()
      })
    })
  }

  private onPopupDisconnected(): void {
    // this.store.dispatch(rejectTransactionSignature())
    // this.store.dispatch(rejectDataSignature())
  }
}
