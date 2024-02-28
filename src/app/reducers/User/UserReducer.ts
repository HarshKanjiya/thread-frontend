import { createReducer, on } from "@ngrx/store";
import { UserInitialState } from "./UserTypes";
import { SET_USER_DATA, SET_USER_LOADING, SET_USER_MESSAGE, SET_USER_NOTIF, SET_USER_OTHER_USER, SET_USER_SUCCESS, SET_USER_TEMP } from "./UserActions";





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

    return { ...state, userData: data }
  }),
  on(SET_USER_NOTIF, (state: any, { notifs }) => {
    return { ...state, notificatinos: notifs }
  }),
  on(SET_USER_OTHER_USER, (state: any, {data}) => {
    return { ...state, otherUserData: data }
  }),
  on(SET_USER_TEMP, (state: any, data) => {
    return { ...state, temp: data }
  }),

)
