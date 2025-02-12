import { API_HOST } from "@/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type LoginPayload = {
    name: string;
    email: string;
}

const LOGIN = async ({ name, email }: LoginPayload) => {
    try {
        await axios.post(`${API_HOST}/auth/login`, {
            name, email
        }, { withCredentials: true })
    } catch {
        throw new Error('Unable to login');
    }
};

const useLogin = () => useMutation({
    mutationFn: LOGIN,
});

export default useLogin;