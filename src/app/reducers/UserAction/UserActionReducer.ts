import { createReducer, on } from "@ngrx/store";
import { SET_USER_ACTION_LOADING, SET_USER_ACTION_MESSAGE, SET_USER_ACTION_SUCCESS, SET_USER_ACTION_TEMP } from "./UserActionActions";
import { UserActionInitialState } from "./UserActionTypes";





export const UserActionReducer = createReducer(
  UserActionInitialState,
  on(SET_USER_ACTION_LOADING, (state: any, { loading }) => {
    return { ...state, loading }
  }),

  on(SET_USER_ACTION_SUCCESS, (state: any, { success }) => {
    return { ...state, success }
  }),

  on(SET_USER_ACTION_MESSAGE, (state: any, { message }) => {
    return { ...state, message }
  }),

  on(SET_USER_ACTION_TEMP, (state: any, { temp }) => {
    return { ...state, temp }
  }),

)
