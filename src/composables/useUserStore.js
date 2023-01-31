import { defineStore } from "pinia";

const SESSION_STORAGE_KEY = "cerbos_user";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: {
      id: null,
      loggedIn: false,
      email: null,
      role: "user",
    },
  }),
  actions: {
    login(email, role) {
      this.user = {
        id: "cerbos_user", // Faked ID
        loggedIn: true,
        email,
        role: role || this.user.role,
      };

      if (process.client) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(this.user));
      }
    },

    logout() {
      if (process.client) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    },

    updateUser(newUser) {
      this.user = { ...this.user, newUser };
    },
  },
});
