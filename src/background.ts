import { browser, startMain } from '@web3lab/wallet-background'
import { SUPPORT_TABBED_ONBOARDING } from '@web3lab/wallet-background/features'

browser.runtime.onInstalled.addListener(async (obj) => {
  if (obj.reason === 'install' && SUPPORT_TABBED_ONBOARDING) {
    const url = browser.runtime.getURL('tab.html#onboarding')

    await browser.tabs.create({ url })
  }
})

startMain().catch(e => console.error(e))
