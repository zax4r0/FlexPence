import { useQuery } from '@tanstack/react-query'
import TestService, { TEST_ENDPOINTS } from './test.service'

export function useGetJokeQuery(slug: string) {
    const jokeQuery = useQuery({
        queryKey: [TEST_ENDPOINTS.joke(slug)],
        queryFn: () => TestService.get(slug)
    })

    return {
        ...jokeQuery,
        joke: jokeQuery.data,
        isJokeLoading: jokeQuery.isLoading,
        jokeError: jokeQuery.error
    }
}
