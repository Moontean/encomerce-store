

import { create } from "zustand";

interface UseStoreModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void; // Убедитесь, что все методы корректно объявлены
}

export const useStoreModal = create<UseStoreModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }), // Проверьте синтаксис здесь
}));
