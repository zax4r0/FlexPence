import NativeSmsModule from './src/NativeSmsModule'
import { SMSMessage } from './src/NativeSms.types'

export function readSMS(): SMSMessage[] {
  return NativeSmsModule.readSMS()
}

export { SMSMessage }
