import { defineStore } from "pinia";

export default defineStore({
  id: "auth",
  state: () => ({
    auth: false as boolean,
    user: null as object | null,
  }),

  getters: {
    isAuth(state): boolean {
      return state.auth;
    },

    isUser(state): any {
      return state.user;
    },
  },

  actions: {
    setUser(user: object): void {
      this.auth = true;
      this.user = user;
    },

    clearUser(): void {
      this.auth = false;
      this.user = null;
    },
  },
});
