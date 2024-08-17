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
  UserResponse,
} from "@/shared/interfaces/context.interface";
import authAPI from "@/utils/authAPI.util";
import { authenticate, signout, signup } from "@/services/authAPIServices";
import { SuccessResponse } from "@/shared/interfaces/country.interface";
import Cookies from "js-cookie";
import storageKeys from "@/config/storageKeys";
import { NavigateFunction } from "react-router-dom";

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
const setSession = (accessToken: string, refreshToken: string) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    authAPI.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    Cookies.set(storageKeys.refreshToken, refreshToken);
  } else {
    localStorage.removeItem("accessToken");
    Cookies.remove(storageKeys.refreshToken);
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
  login: (email: string, password: string, navigate: NavigateFunction) =>
    Promise.resolve(),
  logout: () => {},
  registerAccount: (
    email: string,
    username: string,
    password: string,
    navigate: NavigateFunction
  ) => Promise.resolve(),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, authState);

  const login = async (
    username: string,
    password: string,
    navigate: NavigateFunction
  ) => {
    try {
      const response = await authenticate(username, password);
      console.log(response.data);
      const token = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const user: UseProfile = {
        userName: response.data.username,
        email: response.data.email,
        avatar: response.data.avatar,
      };
      setSession(token, refreshToken);
      dispatch({
        type: ActionKind.LOGIN,
        payload: {
          user: user,
        },
      });

      swal("Đăng nhập thành công !", {
        icon: "success",
      });
      navigate("/search");
    } catch (err) {
      const errors = err as Error | AxiosError;
      console.log(errors);
      swal("Email hoặc mật khẩu không đúng", {
        icon: "error",
      });
    }
  };

  const registerAccount = async (
    email: string,
    username: string,
    password: string,
    navigate: NavigateFunction
  ) => {
    try {
      const response = await signup(email, username, password);

      const { accessToken, user } = response.data;

      dispatch({
        type: ActionKind.RESISTER,
        payload: {
          user,
        },
      });
      swal("Đăng ký thành công !", {
        icon: "success",
      });
      navigate("login");
    } catch (err) {
      const errors = err as Error | AxiosError;
      console.log(errors);
      swal("Email hoặc tên không hợp lệ", {
        icon: "error",
      });
    }
  };

  const logout = async () => {
    setSession("", "");
    const res = await signout();
    dispatch({ type: ActionKind.LOGOUT, payload: {} });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const refreshToken = Cookies.get(storageKeys.refreshToken);
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken, refreshToken ? refreshToken : "");
          const response = await authAPI.get(`/api/user/getProfile`);
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
              user: { userName: "", email: "", avatar: undefined },
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ActionKind.INIT,
          payload: {
            isAuthenticated: false,
            user: { userName: "", email: "", avatar: undefined },
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
        registerAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
