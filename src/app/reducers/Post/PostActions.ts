import { createAction, props } from "@ngrx/store"

export const SET_POST_MESSAGE = createAction("[POST] set message", props<{ message: string | null }>())
export const SET_POST_SUCCESS = createAction("[POST] set success", props<{ success: boolean }>())
export const SET_POST_LOADING = createAction("[POST] set loading", props<{ loading: boolean }>())
export const SET_POST_MY_THREADS = createAction("[POST] set my thread", props<{ threads: any[] }>())
export const SET_POST_FEED = createAction("[POST] set feed", props<{ threads: any[] }>())
export const SET_POST_TEMP = createAction("[POST] set temp", props<any>())
