export interface UseProfile {
    userName: string;
    email: string;
    avatar: string;
}
export interface MyToken {
    name: string;
    exp: number;
}
export interface InitialState {
    isAuthenticated?: boolean | undefined;
    isInitialised?: boolean | undefined;
    user?: UseProfile | null;
}
export enum ActionKind {
    INIT = "INIT",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    RESISTER = "REGISTER",
  }
export interface Action {
    type: ActionKind;
    payload: InitialState;
}
