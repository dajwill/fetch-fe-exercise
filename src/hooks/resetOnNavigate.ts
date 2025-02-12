import useFavoritesStore from "@/stores/favorites"
import useFilterStore from "@/stores/filters"
import { useLocation } from "wouter"

const resetOnNavigate = () => {
    const [_, navigate] = useLocation()
    const { clearFavorites } = useFavoritesStore(state => state)
    const { clearBreeds, clearZipCodes } = useFilterStore(state => state);

    return (url: string|URL, options?: { replace: boolean, state: Record<string, any>}) => {
        clearBreeds()
        clearFavorites()
        clearZipCodes()
        navigate(url, options)
    }
}

export default resetOnNavigate;