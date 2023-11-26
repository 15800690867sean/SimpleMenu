'use client';

import React from 'react'

export default function Error({
    error,
    reset
} : {
    error: Error,
    reset: () => void,
}) {
  return (
    <div>
        <div>There is an error!</div>
        <div>{error.message}</div>
        <button onClick={() => reset()}>Reset</button>
    </div>
  )
}
