import { API_HOST } from "@/config"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const GET_MATCH = async (ids: string[]): Promise<string> => {
    try {
        const res = await axios.post(`${API_HOST}/dogs/match`, ids, { withCredentials: true })
        return res.data.match
    } catch (error) {
        throw error
    }
}

const useMatch = () => useMutation({
    mutationFn: GET_MATCH,
})

export default useMatch;