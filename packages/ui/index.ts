import React, { ComponentType } from 'react'
import ReactDOM from 'react-dom'
import { Store } from 'webext-redux'
import { browser, newProxyStore } from '@web3lab/wallet-background'
import { SUPPORT_TABBED_ONBOARDING } from '@web3lab/wallet-background/features'

import './style.css'
import Popup from './screens/Popup'

async function attachUIToRootElement(
  component: ComponentType<{ store: Store }>,
  store?: Store
): Promise<void> {
  const rootElement = document.getElementById('move-wallet-root')

  if (!rootElement) {
    throw new Error(
      'Failed to find #move-wallet-roo element; page structure changed?'
    )
  }

  const backgroundStore = store ?? (await newProxyStore())

  ReactDOM.render(
    React.createElement(component, { store: backgroundStore }),
    rootElement
  )
}

export async function attachPopupUIToRootElement(): Promise<void> {
  const store = await newProxyStore()

  if (SUPPORT_TABBED_ONBOARDING) {
    const state = store.getState()

    /* if (Object.keys(state.account?.accountsData?.evm).length === 0) {
      // we're onboarding! look for an onboarding tab, or open a new one,
      // rather than rendering the popup
      const baseURL = browser.runtime.getURL('tab.html')

      const tabs = (await browser.tabs.query({ url: baseURL })).filter(
        (tab) => tab?.url && tab.url.includes('onboarding')
      )

      if (tabs.length > 0 && tabs[0]?.id) {
        await browser.tabs.update(tabs[0].id, { active: true })
      } else {
        await browser.tabs.create({
          url: browser.runtime.getURL('tab.html#onboarding')
        })
      }

      window.close()
    } */
  }

  await attachUIToRootElement(Popup, store)
}
