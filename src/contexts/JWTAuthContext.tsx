import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosError } from "axios";
import swal from "sweetalert";
import {
  Action,
  ActionKind,
  InitialState,
  MyToken,
  UseProfile,
} from "@/shared/interfaces/context.interface";
import authAPI from "@/utils/authAPI.util";

const authState: InitialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jwtDecode<MyToken>(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};
const setSession = (accessToken: string) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    authAPI.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete authAPI.defaults.headers.common.Authorization;
  }
};

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;
      console.log("login");
      return {
        ...state,
        isAuthenticated: true,
        user: user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...authState,
  method: "JWT",
  login: (email: string, password: string) => Promise.resolve(),
  logout: () => {},
  register: (email: string, username: string, password: string) =>
    Promise.resolve(),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, authState);

  const login = async (username: string, password: string) => {
    try {
      const response = await authAPI.post(`auth/signin`, {
        username: username,
        password: password,
      });
      const { token, user } = response.data;
      console.log(response.data);
      const roles = response.data.roles;
      setSession(token);
      dispatch({
        type: ActionKind.LOGIN,
        payload: {
          user: {
            userName: user.username,
            email: user.email,
            avatar: user.image,
          },
        },
      });

      swal("Đăng nhập thành công !", {
        icon: "success",
      });
    } catch (err) {
      const errors = err as Error | AxiosError;
      swal(errors.message, {
        icon: "error",
      });
    }
  };

  const register = async (
    email: string,
    username: string,
    password: string
  ) => {
    const response = await axios.post("/api/auth/register", {
      email,
      username,
      password,
    });

    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: ActionKind.RESISTER,
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession("");
    dispatch({ type: ActionKind.LOGOUT, payload: {} });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        // const accessToken = cookies.accessToken;
        if (accessToken) {
          setSession(accessToken);
          const response = await authAPI.get(`user/getProfile`);
          console.log(response);
          const user: UseProfile = {
            userName: response.data.username,
            email: response.data.email,
            avatar: response.data.image,
          };
          console.log(user);
          dispatch({
            type: ActionKind.INIT,
            payload: {
              isAuthenticated: true,
              isInitialised: true,
              user: user,
            },
          });
        } else {
          dispatch({
            type: ActionKind.INIT,
            payload: {
              isAuthenticated: false,
              user: { userName: "de", email: "sssss", avatar: "sss" },
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ActionKind.INIT,
          payload: {
            isAuthenticated: false,
            user: { userName: "de", email: "sssss", avatar: "sss" },
          },
        });
      }
    })();
  }, []);

  // if (!state.isInitialised) {
  //   return <MatxLoading />;
  // }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
