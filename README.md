# @lucets/message-hooks

Message hooks for [@lucets/luce](https://github.com/lucets/luce).

Can be used stand-alone as well. Zero dependencies!

## Install

Install through npm:

```
npm i @lucets/message-hooks
```

## Example

```ts
'use strict'

import MessageHooks from './index'

// Example message interface
export interface Message {
  n: number
}

// Example context interface
export interface Context {
  state: Record<string, any>
}

const hooks: MessageHooks<Message, Context> = new MessageHooks()

// Add a hook
hooks.add(async (message, ctx, next) => {
  console.log(`[message]: ${JSON.stringify(message)}`)
  return next()
})

// Run all hooks
hooks.run({ n: 1 }, { state: {} }).then(() => {
  console.log('hooks successfully run')
}).catch((err: Error) => {
  console.error(err)
})
```

## License

Copyright 2021 [Michiel van der Velde](https://michielvdvelde.nl).

This software is licensed under [the MIT License](LICENSE).
