import { create } from "zustand";

interface SortState {
    sort: string
    order: string
    toggleOrder: () => void;
}

const useSortStore = create<SortState>()((set) => ({
    sort: 'breed',
    order: 'desc',
    toggleOrder: () => set(state => {
        return ({ order: state.order === 'desc' ? 'asc' : 'desc'})
    }),
}))

export default useSortStore