/* eslint-disable @typescript-eslint/no-unused-vars */

export interface AuthResponse {
  token: string
  user: User
}

export interface User {
  first_name: string
  username: string
  is_staff: boolean
  id: number
  language: string
  timezone: Date
}

export interface RegisterUserInput {
  username: string
  name: string
  password: string
  passwordConfirm: string
}
export interface LoginUserInput {
  username: string
  password: string
}

export interface Joke {
  error: boolean
  category: string
  type: string
  setup: string
  delivery: string
  joke: string
  flags: Flags
  id: number
  safe: boolean
  lang: string
  message: string
}

export interface Flags {
  nsfw: boolean
  religious: boolean
  political: boolean
  racist: boolean
  sexist: boolean
  explicit: boolean
}
