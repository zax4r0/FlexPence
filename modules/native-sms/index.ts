import NativeSmsModule from './src/NativeSmsModule'
import { MessageResponse, SMSMessage } from './src/NativeSms.types'

export function helloWorld(): Promise<MessageResponse[]> {
    return NativeSmsModule.helloWorld()
}

export async function asyncGreetings(message: string) {
    return await NativeSmsModule.asyncGreetings(message)
}

export async function readSMSAsync() {
    return await NativeSmsModule.readSMSAsync()
}

export { SMSMessage, MessageResponse }
