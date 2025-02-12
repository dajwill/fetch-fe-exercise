import { create } from "zustand"

interface FilterState {
    breeds: string[]
    zipCodes: Set<string>
    setBreeds: (breeds: string[]) => void
    clearBreeds: () => void
    clearZipCodes: () => void
    removeZipCode: (code: string) => void
    addZipCode: (code: string) => void
}

const useFilterStore = create<FilterState>()((set) => ({
    breeds: [],
    zipCodes: new Set(),
    setBreeds: (breeds) => set({breeds}),
    clearBreeds: () => set({breeds: []}),
    clearZipCodes: () => set({zipCodes: new Set()}),
    addZipCode: (code) => set(state => {
        state.zipCodes.add(code)
        return { zipCodes: state.zipCodes }
    }),
    removeZipCode: (code) => set(state => {
        state.zipCodes.delete(code)
        return { zipCodes: state.zipCodes }
    }),
}))

export default useFilterStore