import { HttpClient } from '@/lib/http-client'
import { Joke } from '@/types'

const apiClient = new HttpClient('https://v2.jokeapi.dev/joke')

export const TEST_ENDPOINTS = {
    joke: (slug: string) => `/Any?contains=${slug}`
}

const TestService = {
    get: (slug: string) => apiClient.get<Joke>(TEST_ENDPOINTS.joke(slug))
}
export default TestService
