export type SMSMessage = {
    message: string
    sender: string
    date: number
    read: boolean
    type: number
    thread: number
    service: string
}

export interface MessageResponse {
    sender: string
    messages: SMSMessage[]
}
