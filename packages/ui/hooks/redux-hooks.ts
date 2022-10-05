import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { BackgroundDispatch, RootState } from '@web3lab/wallet-background'
import { noopAction } from '@web3lab/wallet-background/redux-slices/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncifyFn<K> = K extends (...args: any[]) => any
  ? (...args: Parameters<K>) => Promise<ReturnType<K>>
  : never

export const useBackgroundDispatch = (): AsyncifyFn<BackgroundDispatch> =>
  useDispatch<BackgroundDispatch>() as AsyncifyFn<BackgroundDispatch>

export const useBackgroundSelector: TypedUseSelectorHook<RootState> =
  useSelector

/**
 * Returns true once all pending redux updates scheduled before the first render
 * (if any) have been applied, and false otherwise.
 */
export function useIsBackgroundSettled(): boolean {
  const [settled, setSettled] = useState(false)
  const dispatch = useBackgroundDispatch()

  useEffect(() => {
    Promise.resolve(dispatch(noopAction())).then(() => {
      setSettled(true)
    })
  })

  return settled
}
