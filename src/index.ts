'use strict'

async function noopAsync () {}

/** Represents a message hook. */
export interface MessageHook<TMessage, TContext> {
  (message: TMessage, ctx: TContext, next: () => Promise<void>): Promise<void>
}

export default class MessageHooks<TMessage, TContext> extends Set<MessageHook<TMessage, TContext>> {
  /**
   * Compose one or more message hooks into a single
   * message hook.
   * @param hooks One or more message hooks
   */
  public static compose<TMessage, TContext> (...hooks: MessageHook<TMessage, TContext>[]): MessageHook<TMessage, TContext> {
    return async function composed (message: TMessage, ctx: TContext, next: () => Promise<void>) {
      let index = -1

      const dispatch = async (i: number): Promise<void> => {
        if (i <= index) {
          throw new Error('next() called multiple times')
        }

        index = i
        const fn = hooks[i]

        if (fn) {
          return fn(message, ctx, dispatch.bind(null, i + 1))
        } else if (next) {
          return next()
        }
      }

      return dispatch(0)
    }
  }

  /**
   * Run the message hooks.
   * @param message The message
   * @param ctx The context
   */
  public async run (message: TMessage, ctx: TContext) {
    if (!this.size) {
      return
    }

    return MessageHooks.compose(...this.values())(message, ctx, noopAsync)
  }
}
