import { API_HOST } from "@/config"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useLocation } from "wouter"

const GET_MATCH = async (ids: string[]): Promise<string> => {
    try {
        const res = await axios.post(`${API_HOST}/dogs/match`, ids, { withCredentials: true })
        return res.data.match
    } catch (error) {
        throw error
    }
}

const useMatch = () => {
    const [_, navigate] = useLocation();
    return useMutation({
        mutationFn: GET_MATCH,
        onSuccess: (data) => navigate(`/match/${data}`)
    })
}

export default useMatch;