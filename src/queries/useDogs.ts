import { API_HOST } from '@/config';
import useFilterStore from '@/stores/filters';
import useSortStore from '@/stores/sorts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type QueryParams = {
    breeds?: string[]
    zipCodes?: string[]
    ageMin?: number
    ageMax?: number
    size?: number
    from?: number
    sort?: string
}

type DogSearchResult = {
    resultIds: string[]
    next?: string
    prev?: string
    total: number
}

const GET_DOGS = async (queryParams: QueryParams = {}): Promise<DogSearchResult> => {
    try {
        const res = await axios.get(`${API_HOST}/dogs/search`, {
            params: {
                ...queryParams,
                from: (queryParams.from ?? 0) * 20,
                size: 20
            },
            withCredentials: true,
        })
        return res.data
    } catch (error) {
        throw error
    }
}

const useDogs = (params?: QueryParams) => {
    const { breeds, zipCodes } = useFilterStore(state => state)
    const { sort, order } = useSortStore(state => state)
    const queryParams = {
        ...params,
        breeds,
        zipCodes: [...zipCodes.values()],
        sort: `${sort}:${order}`
    }
    return useQuery({
        queryKey: ['getDogs', queryParams],
        queryFn: () => GET_DOGS(queryParams)
    })
}

export default useDogs;