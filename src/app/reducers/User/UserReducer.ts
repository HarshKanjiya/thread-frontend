import { createReducer, on } from "@ngrx/store";
import { UserInitialState } from "./UserTypes";
import { SET_USER_DATA, SET_USER_LOADING, SET_USER_MESSAGE, SET_USER_SUCCESS } from "./UserActions";





export const UserReducer = createReducer(
  UserInitialState,
  on(SET_USER_LOADING, (state: any, { loading }) => {

    return { ...state, loading: loading }
  }),
  on(SET_USER_SUCCESS, (state: any, { success }) => {

    return { ...state, success: success }
  }),
  on(SET_USER_MESSAGE, (state: any, { message }) => {

    return { ...state, message: message }
  }),
  on(SET_USER_DATA, (state: any, { data }) => {

    return { ...state, data: data }
  }),

)
