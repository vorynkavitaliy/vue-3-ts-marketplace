import { defineStore } from "pinia";

export interface INotify {
  message: string;
  type: string;
}

export default defineStore({
  id: "notify",
  state: () => ({
    notify: null as INotify | null,
  }),

  getters: {
    isNotify(state): INotify | null {
      return state.notify;
    },
  },

  actions: {
    setNotify(notify: INotify | null): void {
      this.notify = notify;
    },
  },
});
