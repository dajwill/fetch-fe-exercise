import { create } from "zustand";

interface FavoriteState {
    favorites: Set<string>
    clearFavorites: () => void;
    toggleFavorite: (id: string) => void;
}

const useFavoritesStore = create<FavoriteState>()((set) => ({
    favorites: new Set(),
    clearFavorites: () => set({favorites: new Set()}),
    toggleFavorite: id => set(state => {
        state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id)
        return { favorites: state.favorites }
    })
}));

export default useFavoritesStore;