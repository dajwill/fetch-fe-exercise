import { API_HOST } from "@/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const LOGOUT = async () => {
    try {
        await axios.post(`${API_HOST}/auth/logout`, {}, { withCredentials: true })
    } catch (error) {
        throw error
    }
}

const useLogout = () => useMutation({
    mutationFn: LOGOUT,
})

export default useLogout;