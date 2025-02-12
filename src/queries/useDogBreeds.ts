import { API_HOST } from "@/config"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const GET_DOG_BREEDS = async (): Promise<string[]> => {
    try {
        const res = await axios.get(`${API_HOST}/dogs/breeds`, {withCredentials: true})
        return res.data
    } catch (error) {
        throw error
    }
}

const useDogBreeds = () => useQuery({
    queryKey: ['dogBreeds'],
    queryFn: GET_DOG_BREEDS,
});

export default useDogBreeds