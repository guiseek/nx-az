import { fireAuthMessages } from './fire-auth.constants'
import {
  FireAuthError,
  FireAuthMessages,
  FireAuthKeyMessage,
} from './fire-auth.types'

export class FireAuthMessage {
  private static messages = new Map<FireAuthKeyMessage, string>(
    fireAuthMessages
  )

  static setCustomMessages(messages: FireAuthMessages) {
    messages.forEach(([code, message]) => {
      FireAuthMessage.setMessage(code, message)
    })
  }

  static setMessage(key: FireAuthKeyMessage, message: string) {
    if (FireAuthMessage.messages.has(key)) {
      FireAuthMessage.messages.set(key, message)
    }
  }

  static getMessage(key: FireAuthKeyMessage) {
    if (!FireAuthMessage.messages.has(key)) {
      throw new Error(`Key message not found`)
    }
    return FireAuthMessage.messages.get(key)
  }

  static getByError({ code, message }: FireAuthError) {
    if (!FireAuthMessage.messages.has(code)) {
      return message
    }
    return FireAuthMessage.messages.get(code)
  }
}
