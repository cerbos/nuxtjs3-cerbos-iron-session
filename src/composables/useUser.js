const INITIAL_USER_STATE = {
  id: null,
  loggedIn: false,
  email: null,
  role: "user",
};

const SESSION_STORAGE_KEY = "cerbos_user";

export default () => {
  const user = useState("user", () => {
    if (process.client) {
      return (
        JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)) ||
        INITIAL_USER_STATE
      );
    }

    return INITIAL_USER_STATE;
  });

  const login = (email, role) => {
    user.value = {
      id: "cerbos_user", // Faked ID
      loggedIn: true,
      email,
      role: role || INITIAL_USER_STATE.role,
    };

    if (process.client) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user.value));
    }
  };

  const logout = () => {
    if (process.client) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  };

  const updateUser = (newUser) => {
    user.value = { ...user.value, newUser };
  };

  return { user, login, logout, updateUser };
};
