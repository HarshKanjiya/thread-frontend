import { createReducer, on } from "@ngrx/store";
import { PostInitialState } from "./PostTypes";
import { SET_POST_DATA, SET_POST_FEED, SET_POST_LOADING, SET_POST_MESSAGE, SET_POST_MY_THREADS, SET_POST_REPLIES, SET_POST_SUCCESS, SET_POST_TEMP } from "./PostActions";




export const PostReducer = createReducer(
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
  on(SET_POST_MY_THREADS, (state: any, { threads }) => {

    return { ...state, myThreads: threads }
  }),
  on(SET_POST_FEED, (state: any, { threads }) => {

    return { ...state, Feed: threads }
  }),
  on(SET_POST_TEMP, (state: any, { data }) => {

    return { ...state, temp: data }
  }),
  on(SET_POST_DATA, (state: any, { data }) => {

    return { ...state, threadData: data }
  }),
  on(SET_POST_REPLIES, (state: any, { replies }) => {

    return { ...state, threadReplies: replies }
  }),

)
