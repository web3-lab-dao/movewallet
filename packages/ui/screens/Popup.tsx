import React, { ReactElement, useState, useEffect } from 'react'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useBackgroundDispatch, useBackgroundSelector } from '@web3lab/wallet-ui/hooks'
import { increment } from '@web3lab/wallet-background/redux-slices/counter'

import { Store } from 'webext-redux'
import { Provider } from 'react-redux'

export function Main(): ReactElement {
  const dispatch = useBackgroundDispatch()
  const count = 0;

  const incr = () => dispatch(increment())

  return (
    <>
      <div className="top_menu_wrap_decoy">
        Popups

        <p>Count: {count}</p>

        <button onClick={incr}>Incr</button>
      </div>
    </>
  )
}

export default function Popup({ store }: { store: Store }): ReactElement {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
