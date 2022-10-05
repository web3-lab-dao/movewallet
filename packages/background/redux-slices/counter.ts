import Emittery from 'emittery'
import { createSlice, createSelector } from '@reduxjs/toolkit'
import { createBackgroundAsyncThunk } from './utils'

export type CounterState = {
  count: number
}

export type Events = {
  reset: string
}

export const emitter = new Emittery<Events>()
export const initialState: CounterState = {
  count: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      console.log(state.count)
      state.count++
    },
    decrement(state) {
      console.log(state.count)
      state.count--
    }
  }
})

export const {
  increment,
  decrement
} = counterSlice.actions

export default counterSlice.reducer
