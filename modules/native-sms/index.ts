import NativeSmsModule from './src/NativeSmsModule'
import { SMSMessage } from './src/NativeSms.types'

export function helloWorld(): Promise<SMSMessage[]> {
    return NativeSmsModule.helloWorld()
}

export async function asyncGreetings(message: string) {
    return await NativeSmsModule.asyncGreetings(message)
}

export async function readSMSAsync() {
    return await NativeSmsModule.readSMSAsync()
}

export { SMSMessage }
