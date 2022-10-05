import { attachPopupUIToRootElement } from '@web3lab/wallet-ui'

setTimeout(() => {
  const isAppRendered = !!document.getElementsByClassName('top_menu_wrap_decoy').length

  if (!isAppRendered) {
    // window.location.reload()
  }
}, 1000)

attachPopupUIToRootElement().catch((e) => console.error(e))
