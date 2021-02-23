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
