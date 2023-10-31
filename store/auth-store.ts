import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  // loading
  loading: boolean;

  // input fields to login
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;

  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const useAuthStore = create(
  persist<State>(
    (set, get) => ({
      loading: false,
      name: "",
      setName: (name: string) => set({ name: name }),
      email: "",
      setEmail: (email: string) => set({ email: email }),

      handleLogin: async () => {
        set({ loading: true });

        await fetch(`https://frontend-take-home-service.fetch.com/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: useAuthStore.getState().name,
            email: useAuthStore.getState().email,
          }),
        })
          .then((res) => {
            if (res.ok) {
              window.location.replace("/");
            }
            set({ loading: false });
          })
          .catch((err) => console.log(err))
          .finally(() => set({ loading: false }));
      },
      handleLogout: async () => {
        set({ loading: true });

        await fetch(
          `https://frontend-take-home-service.fetch.com/auth/logout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        )
          .then((res) => {
            set({ loading: false });
            window.location.replace("/login");

            set({ email: "" });
            set({ name: "" });
          })
          .catch((err) => console.log(err))
          .finally(() => set({ loading: false }));
      },
    }),
    {
      name: "auth-storage", // Nombre único para el almacenamiento

      storage: createJSONStorage(() => sessionStorage), // Usar sessionStorage o localStorage
    }
  )
);
