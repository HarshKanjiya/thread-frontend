import { createReducer, on } from "@ngrx/store";

import { SET_ADMIN_CONSTANTS, SET_ADMIN_LOADING, SET_ADMIN_MESSAGE, SET_ADMIN_PACKAGES, SET_ADMIN_SUCCESS, SET_ADMIN_TEMP } from "./AdminActions";
import { AdminInitialState } from "./AdminTypes";




export const AdminReducer = createReducer(
  AdminInitialState,
  on(SET_ADMIN_LOADING, (state: any, { loading }) => {
    return { ...state, loading }
  }),

  on(SET_ADMIN_SUCCESS, (state: any, { success }) => {
    return { ...state, success }
  }),

  on(SET_ADMIN_MESSAGE, (state: any, { message }) => {
    return { ...state, message }
  }),

  on(SET_ADMIN_PACKAGES, (state: any, { packages }) => {
    return { ...state, packages }
  }),

  on(SET_ADMIN_CONSTANTS, (state: any, { constants }) => {
    return { ...state, constants }
  }),

  on(SET_ADMIN_TEMP, (state: any, { data }) => {
    return { ...state, temp: data }
  }),

)
