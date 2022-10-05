// @ts-ignore
declare module 'webext-redux/lib/strategies/deepDiff/diff' {
  // This should be : DiffStrategy, but importing webext-redux to reuse
  // DiffStrategy results in an error augmenting the diff module.
  export default function (): (oldObj: unknown, newObj: unknown) => unknown
}

// @ts-ignore
declare module 'webext-redux/lib/strategies/deepDiff/patch' {
  // This should be : DiffStrategy, but importing webext-redux to reuse
  // DiffStrategy results in an error augmenting the patch module.
  export default function (): (oldObj: unknown, newObj: unknown) => unknown
}

declare module 'styled-jsx/style'
