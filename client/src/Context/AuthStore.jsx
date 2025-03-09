import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist((set)=>({
        Token :null,
        setToken : (newToken) => set({Token: newToken}),
        removeToken : () => set({Token:null}),
        updateToken:(updateToken) => set((state)=>({
            Token : {...state.Token,user:updateToken}
        })),
    }))
)

export default useAuthStore ;