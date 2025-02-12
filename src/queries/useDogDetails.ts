import { API_HOST } from "@/config"
import { Dog } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const GET_DOG_DETAILS = async (ids: string[]): Promise<Dog[]> => {
    try {
        const res = await axios.post(`${API_HOST}/dogs`, ids, { withCredentials: true })
        return res.data
    } catch (error) {
        throw error
    }
}

const useDogDetails = (ids: string[] = []) => {
    return useQuery({
        queryKey: ['getDogDetails', ids],
        queryFn: () => GET_DOG_DETAILS(ids),
        enabled: !!ids?.length
    })
}

export default useDogDetails;