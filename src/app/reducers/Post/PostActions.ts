import { createAction, props } from "@ngrx/store"

export const SET_POST_MESSAGE = createAction("[USER] set message", props<{ message: string | null }>())
export const SET_POST_SUCCESS = createAction("[USER] set success", props<{ success: boolean }>())
export const SET_POST_LOADING = createAction("[USER] set loading", props<{ loading: boolean }>())
export const SET_POST_DATA = createAction("[USER] set data", props<{ data: Object | null }>())
export const SET_POST_TEMP = createAction("[USER] set temp", props<any>())
