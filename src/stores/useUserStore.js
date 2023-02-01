import { defineStore } from "pinia";

const SESSION_STORAGE_KEY = "cerbos_user";

const ORIGINAL_USER = {
  id: null,
  loggedIn: false,
  email: null,
  role: "user",
};

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: ORIGINAL_USER,
    loading: true,
  }),
  actions: {
    login(email, role) {
      this.user = {
        ...this.user,
        id: "tbd", // Faked ID
        loggedIn: true,
        email,
        role: role || this.user.role,
      };

      if (process.client) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(this.user));
      }
    },

    loadUserDetails() {
      if (process.client) {
        const user = localStorage.getItem(SESSION_STORAGE_KEY);

        // Fake user loading (similar to what would happen if you actually logged in to a live app)
        setTimeout(() => {
          this.loading = false;
        }, 500);

        if (user) {
          this.user = JSON.parse(user);
        }
      }
    },

    logout() {
      this.user = ORIGINAL_USER;
      if (process.client) {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    },

    updateUser(newUser) {
      this.user = { ...this.user, ...newUser };

      if (process.client) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(this.user));
      }
    },
  },
});
