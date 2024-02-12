import { createReducer, on } from "@ngrx/store";
import { PostInitialState } from "./PostTypes";
import { SET_POST_DATA, SET_POST_LOADING, SET_POST_MESSAGE, SET_POST_SUCCESS, SET_POST_TEMP } from "./PostActions";




export const UserReducer = createReducer(
  PostInitialState,
  on(SET_POST_LOADING, (state: any, { loading }) => {

    return { ...state, loading: loading }
  }),
  on(SET_POST_SUCCESS, (state: any, { success }) => {

    return { ...state, success: success }
  }),
  on(SET_POST_MESSAGE, (state: any, { message }) => {

    return { ...state, message: message }
  }),
  on(SET_POST_DATA, (state: any, { data }) => {

    return { ...state, data: data }
  }),
  on(SET_POST_TEMP, (state: any, { data }) => {

    return { ...state, temp: data }
  }),

)
