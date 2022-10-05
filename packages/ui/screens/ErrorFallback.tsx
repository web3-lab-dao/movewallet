import React, { ReactElement } from 'react'

export default function ErrorFallback(): ReactElement {
  return (
    <>
      <div className="wrap">
        <h1 className="serif_header">:( Unexpected Error</h1>
      </div>
    </>
  )
}
