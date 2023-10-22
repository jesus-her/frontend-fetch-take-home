import { create } from "zustand";

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

export const useAuthStore = create<State>((set, get) => {
  return {
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

    //logout
    handleLogout: async () => {
      set({ loading: true });

      await fetch(`https://frontend-take-home-service.fetch.com/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          set({ loading: false });
          console.log("logout", res);
        })
        .catch((err) => console.log(err))
        .finally(() => set({ loading: false }));
    },
  };
});
