import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
    AxiosRequestHeaders
} from 'axios'
import { AxiosHeaders } from 'axios'
import axios from 'axios'

export class HttpClient {
    private instance: AxiosInstance

    constructor(baseURL: string, defaultHeaders?: AxiosRequestHeaders | Record<string, string>) {
        this.instance = axios.create({
            baseURL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                ...defaultHeaders
            }
        })
        this.initializeInterceptors()
    }

    private initializeInterceptors() {
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                config.headers = new AxiosHeaders({
                    ...config.headers
                }) as AxiosRequestHeaders
                return config
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            }
        )

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Handle authorization errors
                }
                return Promise.reject(error)
            }
        )
    }

    async get<T>(url: string, params?: unknown): Promise<AxiosResponse<T>> {
        const response = await this.instance.get<T>(url, { params })
        return {
            ...response,
            data: response.data as T
        }
    }

    async post<T>(url: string, data: unknown, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const response = await this.instance.post<T>(url, data, options)
        return {
            ...response,
            data: response.data as T
        }
    }

    async put<T>(url: string, data: unknown, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const response = await this.instance.put<T>(url, data, options)
        return {
            ...response,
            data: response.data as T
        }
    }

    async patch<T>(url: string, data: unknown, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const response = await this.instance.patch<T>(url, data, options)
        return {
            ...response,
            data: response.data as T
        }
    }

    async delete<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const response = await this.instance.delete<T>(url, options)
        return {
            ...response,
            data: response.data as T
        }
    }
}

const baseURL = 'https://v2.jokeapi.dev/joke/Any'

const apiClient = new HttpClient(baseURL)

export default apiClient
